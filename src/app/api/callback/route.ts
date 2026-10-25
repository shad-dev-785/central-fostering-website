import { handleSubmission } from "@/lib/submit";
import { callbackSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleSubmission(request, "callback", callbackSchema, (d) => ({
    name: d.name,
    phone: d.phone,
    details: { bestTime: d.bestTime },
  }));
}
