import { test, before } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Point the database at a throwaway file BEFORE the modules read the env.
// The nested folders deliberately do not exist yet: the app must create them itself,
// because a fresh install has no data/ folder (this once caused every form to fail).
const dir = mkdtempSync(join(tmpdir(), "central-fostering-test-"));
process.env.DATABASE_URL = `file:${join(dir, "not", "created", "yet", "test.db").replace(/\\/g, "/")}`;
delete process.env.SMTP_HOST; // never send real mail from tests

let POST: (r: Request) => Promise<Response>;
let listSubmissions: typeof import("./db").listSubmissions;
let resetRateLimits: typeof import("./rate-limit").resetRateLimits;

before(async () => {
  ({ POST } = await import("../app/api/callback/route"));
  ({ listSubmissions } = await import("./db"));
  ({ resetRateLimits } = await import("./rate-limit"));
});

const good = { name: "Sam Example", phone: "020 7946 0000", bestTime: "morning", consent: true, website: "" };

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/callback", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("valid submission is saved, without the consent flag or honeypot leaking into extra columns", async () => {
  resetRateLimits();
  const res = await POST(req(good));
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.ok, true);

  const rows = await listSubmissions();
  const row = rows.find((r) => r.name === "Sam Example");
  assert.ok(row);
  assert.equal(row.kind, "callback");
  assert.equal(row.phone, "020 7946 0000");
  assert.equal(row.status, "new");
  assert.equal("website" in row.payload, false);
  assert.equal(row.payload.bestTime, "morning");
});

test("missing consent is rejected with a field error and stores nothing", async () => {
  resetRateLimits();
  const before = (await listSubmissions()).length;
  const res = await POST(req({ ...good, name: "No Consent", consent: false }));
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.ok(data.fieldErrors.consent);
  assert.equal((await listSubmissions()).length, before);
});

test("honeypot: looks successful to a bot but stores nothing", async () => {
  resetRateLimits();
  const before = (await listSubmissions()).length;
  const res = await POST(req({ ...good, name: "Bot Person", website: "http://spam.example" }));
  assert.equal(res.status, 200);
  assert.equal((await listSubmissions()).length, before);
});

test("cross-site origin is refused", async () => {
  resetRateLimits();
  const res = await POST(req(good, { origin: "https://evil.example" }));
  assert.equal(res.status, 403);
});

test("non-JSON content type is refused", async () => {
  resetRateLimits();
  const res = await POST(req("name=x", { "content-type": "text/plain" }));
  assert.equal(res.status, 415);
});

test("malformed JSON is a 400, not a crash", async () => {
  resetRateLimits();
  const res = await POST(req("{not json"));
  assert.equal(res.status, 400);
});

test("oversized bodies are refused", async () => {
  resetRateLimits();
  const res = await POST(req({ ...good, padding: "x".repeat(25_000) }));
  assert.equal(res.status, 413);
});

test("the sixth submission from one client is rate limited", async () => {
  resetRateLimits();
  const headers = { "x-forwarded-for": "203.0.113.9" };
  for (let i = 0; i < 5; i++) {
    const r = await POST(req({ ...good, name: `Rate Test ${i}` }, headers));
    assert.equal(r.status, 200);
  }
  const blocked = await POST(req(good, headers));
  assert.equal(blocked.status, 429);
});

test("SQL injection text is stored as plain data", async () => {
  resetRateLimits();
  const evil = "Robert'); DROP TABLE submissions;--";
  const res = await POST(req({ ...good, name: evil }));
  assert.equal(res.status, 200);
  const rows = await listSubmissions();
  assert.ok(rows.some((r) => r.name === evil));
});
