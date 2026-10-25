import { z } from "zod";
import { saveSubmission } from "./db";
import { sendNotification } from "./mail";
import { clientKey, isRateLimited } from "./rate-limit";
import type { SubmissionKind } from "./validation";

const MAX_BODY_BYTES = 20_000;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Rejects cross-site browser posts: when an Origin header is sent it must match our own host. */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients (and same-origin GET-style fetches) send none
  const host = request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Shared pipeline for every public form:
 * origin check, size limit, rate limit, honeypot, validation, save, notify.
 *
 * `toRecord` maps validated input onto the stored columns. It is where we
 * decide what is kept; consent and honeypot fields never reach the database.
 */
export async function handleSubmission<S extends z.ZodType<{ name: string; consent: true; website?: string }>>(
  request: Request,
  kind: SubmissionKind,
  schema: S,
  toRecord: (data: z.output<S>) => { name: string; email?: string; phone?: string; details: Record<string, unknown> },
) {
  if (!sameOrigin(request)) return json({ ok: false, error: "Request not allowed." }, 403);

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ ok: false, error: "Unsupported request." }, 415);
  }

  if (isRateLimited(`${kind}:${clientKey(request)}`)) {
    return json({ ok: false, error: "You have sent several requests. Please wait a few minutes or call us instead." }, 429);
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "That request was too large." }, 413);

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "We could not read that request." }, 400);
  }

  // Honeypot tripped: pretend it worked so the bot learns nothing, and store nothing.
  if (raw && typeof raw === "object" && typeof (raw as { website?: unknown }).website === "string" && (raw as { website: string }).website !== "") {
    return json({ ok: true });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: "Please check the form and try again.", fieldErrors: z.flattenError(parsed.error).fieldErrors }, 400);
  }

  const record = toRecord(parsed.data);

  try {
    const id = await saveSubmission({ kind, ...record });
    await sendNotification({
      kind,
      id,
      replyTo: record.email,
      summary: { name: record.name, email: record.email, phone: record.phone, ...record.details },
    });
    return json({ ok: true, reference: id.slice(0, 8) });
  } catch (err) {
    // Never log the submission itself: it contains personal data.
    console.error(`Saving ${kind} failed:`, (err as { code?: string }).code ?? (err as Error).name);
    return json({ ok: false, error: "Something went wrong on our side. Please call us and we will help." }, 500);
  }
}
