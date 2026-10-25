import nodemailer from "nodemailer";
import type { SubmissionKind } from "./validation";

/**
 * Emails the agency when someone submits a form.
 * Configured with SMTP_* and NOTIFY_EMAIL_TO env vars (see .env.example).
 * If they are not set, nothing is sent and the submission is still saved.
 *
 * Plain text only (no HTML) so submitted text can never inject markup.
 * We never email the submitter automatically: an open "send an email to this
 * address" form can be abused to spam third parties.
 */

const subjects: Record<SubmissionKind, string> = {
  enquiry: "New website enquiry",
  callback: "New call back request",
  application: "New foster carer application",
};

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.NOTIFY_EMAIL_TO);
}

export function formatLines(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      return `${label}: ${Array.isArray(v) ? v.join(", ") : String(v)}`;
    })
    .join("\n");
}

export async function sendNotification(opts: {
  kind: SubmissionKind;
  id: string;
  replyTo?: string;
  summary: Record<string, unknown>;
}): Promise<boolean> {
  if (!isMailConfigured()) return false;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? process.env.NOTIFY_EMAIL_TO,
      to: process.env.NOTIFY_EMAIL_TO,
      replyTo: opts.replyTo,
      subject: `${subjects[opts.kind]} (${opts.id.slice(0, 8)})`,
      text: `${subjects[opts.kind]}\n\n${formatLines(opts.summary)}\n\nReference: ${opts.id}\n`,
    });
    return true;
  } catch (err) {
    // Log the error code only: error messages can echo recipient addresses.
    console.error("Notification email failed:", (err as { code?: string }).code ?? "unknown");
    return false;
  }
}
