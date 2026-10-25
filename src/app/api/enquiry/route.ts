import { handleSubmission } from "@/lib/submit";
import { enquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleSubmission(request, "enquiry", enquirySchema, (d) => ({
    name: d.name,
    email: d.email,
    phone: d.phone || undefined,
    details: { contactPreference: d.contactPreference, message: d.message },
  }));
}
