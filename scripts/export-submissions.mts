/**
 * Prints every stored submission as CSV so staff can open it in Excel.
 *   npm run export:submissions > submissions.csv
 * The output contains personal data: keep the file private and delete it when finished.
 */
import { listSubmissions } from "../src/lib/db";

const quote = (v: unknown) => {
  let s = String(v ?? "");
  // Neutralise spreadsheet formula injection (=, +, -, @ at the start of a cell).
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

const rows = await listSubmissions(10_000);
const header = ["Reference", "Type", "Received", "Status", "Name", "Email", "Phone", "Details"];
console.log(header.map(quote).join(","));
for (const r of rows) {
  const details = Object.entries(r.payload)
    .filter(([k]) => k !== "consentGiven")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join("; ") : v}`)
    .join(" | ");
  console.log([r.id.slice(0, 8), r.kind, r.createdAt, r.status, r.name, r.email, r.phone, details].map(quote).join(","));
}
