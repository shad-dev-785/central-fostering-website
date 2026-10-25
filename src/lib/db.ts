import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createClient, type Client } from "@libsql/client";
import type { SubmissionKind } from "./validation";

/**
 * Storage for form submissions.
 *
 * libSQL is SQLite-compatible. Locally it is just a file (DATABASE_URL=file:./data/...).
 * In production, point DATABASE_URL at a hosted libSQL/Turso database (plus
 * DATABASE_AUTH_TOKEN), or keep a file on a server with a persistent disk.
 * The table is created on first use, so there is no separate migration step yet.
 */

let client: Client | null = null;
let ready: Promise<void> | null = null;

function getClient(): Client {
  if (!client) {
    const url = process.env.DATABASE_URL ?? "file:./data/central-fostering.db";
    // SQLite will not create missing folders, so make sure the database folder exists first.
    if (url.startsWith("file:") && !url.includes(":memory:")) {
      mkdirSync(dirname(url.slice("file:".length)), { recursive: true });
    }
    client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  }
  return client;
}

function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = getClient()
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS submissions (
            id         TEXT PRIMARY KEY,
            kind       TEXT NOT NULL CHECK (kind IN ('enquiry','callback','application')),
            created_at TEXT NOT NULL,
            name       TEXT NOT NULL,
            email      TEXT,
            phone      TEXT,
            payload    TEXT NOT NULL,
            status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed'))
          )`,
          `CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions (created_at DESC)`,
        ],
        "write",
      )
      .then(() => undefined);
    // If setup fails, allow a retry on the next request instead of caching the failure.
    ready.catch(() => {
      ready = null;
    });
  }
  return ready;
}

export type SaveInput = {
  kind: SubmissionKind;
  name: string;
  email?: string;
  phone?: string;
  /** Everything else the person told us. Stored as JSON. Must not contain consent flags or honeypot values. */
  details: Record<string, unknown>;
};

export async function saveSubmission(input: SaveInput): Promise<string> {
  await ensureSchema();
  const id = crypto.randomUUID();
  await getClient().execute({
    sql: `INSERT INTO submissions (id, kind, created_at, name, email, phone, payload)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.kind,
      new Date().toISOString(),
      input.name,
      input.email ?? null,
      input.phone ?? null,
      JSON.stringify({ ...input.details, consentGiven: true }),
    ],
  });
  return id;
}

export async function listSubmissions(limit = 200) {
  await ensureSchema();
  const res = await getClient().execute({
    sql: `SELECT id, kind, created_at, name, email, phone, payload, status
          FROM submissions ORDER BY created_at DESC LIMIT ?`,
    args: [limit],
  });
  return res.rows.map((r) => ({
    id: String(r.id),
    kind: String(r.kind),
    createdAt: String(r.created_at),
    name: String(r.name),
    email: r.email ? String(r.email) : "",
    phone: r.phone ? String(r.phone) : "",
    payload: JSON.parse(String(r.payload)) as Record<string, unknown>,
    status: String(r.status),
  }));
}
