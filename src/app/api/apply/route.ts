import { handleSubmission } from "@/lib/submit";
import { applySchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleSubmission(request, "application", applySchema, (d) => ({
    name: d.name,
    email: d.email,
    phone: d.phone,
    details: {
      postcode: d.postcode,
      over21: d.over21,
      homeType: d.homeType,
      spareBedroom: d.spareBedroom,
      householdSize: d.householdSize,
      hasPets: d.hasPets,
      experience: d.experience,
      interestedIn: d.interestedIn,
      howHeard: d.howHeard,
      notes: d.notes,
    },
  }));
}
