"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { applySchema } from "@/lib/validation";
import { fosteringTypes } from "@/content/fostering";
import {
  CheckboxField,
  FormMessage,
  Honeypot,
  RadioGroup,
  SelectField,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextField,
  firstError,
  useSubmit,
} from "./FormKit";

type Values = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  over21: boolean;
  homeType: string;
  spareBedroom: string;
  householdSize: string;
  hasPets: string;
  experience: string;
  interestedIn: string[];
  howHeard: string;
  notes: string;
  consent: boolean;
  website: string;
};

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  postcode: "",
  over21: false,
  homeType: "",
  spareBedroom: "",
  householdSize: "",
  hasPets: "",
  experience: "",
  interestedIn: [],
  howHeard: "",
  notes: "",
  consent: false,
  website: "",
};

const steps = [
  { title: "About you", fields: ["name", "email", "phone", "postcode", "over21"] },
  { title: "Your home", fields: ["homeType", "spareBedroom", "householdSize", "hasPets"] },
  { title: "Experience and interests", fields: ["experience", "interestedIn", "howHeard", "notes", "consent"] },
] as const;

export default function ApplyForm() {
  const { status, errors, setErrors, message, reference, submit, sending } = useSubmit("/api/apply");
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(empty);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => setV((prev) => ({ ...prev, [key]: value }));

  /** Check just this step's fields with the same schema the server uses. */
  function validateStep(index: number) {
    const keys = steps[index].fields as readonly string[];
    const result = applySchema.safeParse(v);
    const found: Record<string, string[]> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (keys.includes(key)) (found[key] ??= []).push(issue.message);
      }
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  }

  function goTo(next: number) {
    setStep(next);
    // Move focus to the step heading so screen reader and keyboard users know the page changed.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function next() {
    if (validateStep(step)) goTo(step + 1);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < steps.length - 1) return next();
    if (!validateStep(step)) return;
    const { ok, fieldErrors } = await submit(v);
    if (!ok) {
      // The server rejected a field from an earlier step: jump back to it.
      const first = steps.findIndex((s) => s.fields.some((f) => fieldErrors[f]));
      if (first >= 0 && first !== step) goTo(first);
    }
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Application received. Thank you!">
        <p>
          A member of our recruitment team will contact you within a few working days to arrange a friendly chat and to
          answer your questions.
        </p>
        {reference && <p className="mt-3 text-sm">Your reference: <strong>{reference}</strong></p>}
      </SuccessPanel>
    );
  }

  const toggleInterest = (slug: string) =>
    set("interestedIn", v.interestedIn.includes(slug) ? v.interestedIn.filter((s) => s !== slug) : [...v.interestedIn, slug]);

  return (
    <form onSubmit={onSubmit} className="relative" noValidate>
      <Honeypot />

      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Application progress">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-1 items-center gap-2" aria-current={i === step ? "step" : undefined}>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                i <= step ? "bg-leaf-700 text-white" : "bg-navy-100 text-navy-700"
              }`}
            >
              {i + 1}
            </span>
            <span className={`hidden text-sm font-bold sm:inline ${i === step ? "text-ink" : "text-ink-soft"}`}>{s.title}</span>
            {i < steps.length - 1 && <span className={`h-0.5 flex-1 rounded ${i < step ? "bg-leaf-700" : "bg-navy-100"}`} />}
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-2xl font-bold outline-none">
        Step {step + 1} of {steps.length}: {steps[step].title}
      </h2>

      <div className="space-y-6">
        {step === 0 && (
          <>
            <TextField id="ap-name" name="name" label="Full name" required autoComplete="name" value={v.name} onChange={(x) => set("name", x)} error={firstError(errors, "name")} />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField id="ap-email" name="email" label="Email address" type="email" required autoComplete="email" value={v.email} onChange={(x) => set("email", x)} error={firstError(errors, "email")} />
              <TextField id="ap-phone" name="phone" label="Phone number" type="tel" inputMode="tel" required autoComplete="tel" value={v.phone} onChange={(x) => set("phone", x)} error={firstError(errors, "phone")} />
            </div>
            <TextField id="ap-postcode" name="postcode" label="Postcode" required autoComplete="postal-code" hint="We use this to check we cover your area." value={v.postcode} onChange={(x) => set("postcode", x)} error={firstError(errors, "postcode")} />
            <CheckboxField id="ap-over21" name="over21" checked={v.over21} onChange={(x) => set("over21", x)} error={firstError(errors, "over21")}>
              I am 21 or over.
            </CheckboxField>
          </>
        )}

        {step === 1 && (
          <>
            <RadioGroup
              name="homeType"
              legend="Do you own or rent your home?"
              required
              options={[
                { value: "own", label: "I own it" },
                { value: "rent", label: "I rent" },
                { value: "other", label: "Something else" },
              ]}
              value={v.homeType}
              onChange={(x) => set("homeType", x)}
              error={firstError(errors, "homeType")}
            />
            <RadioGroup
              name="spareBedroom"
              legend="Do you have a spare bedroom?"
              required
              hint="A child needs their own bedroom."
              options={[
                { value: "yes", label: "Yes" },
                { value: "could_create", label: "I could create one" },
                { value: "no", label: "No" },
              ]}
              value={v.spareBedroom}
              onChange={(x) => set("spareBedroom", x)}
              error={firstError(errors, "spareBedroom")}
            />
            <TextField id="ap-household" name="householdSize" label="How many people live in your home, including you?" type="number" inputMode="numeric" required value={v.householdSize} onChange={(x) => set("householdSize", x)} error={firstError(errors, "householdSize")} />
            <RadioGroup
              name="hasPets"
              legend="Do you have any pets?"
              required
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              value={v.hasPets}
              onChange={(x) => set("hasPets", x)}
              error={firstError(errors, "hasPets")}
            />
          </>
        )}

        {step === 2 && (
          <>
            <RadioGroup
              name="experience"
              legend="Which best describes your experience with children?"
              required
              options={[
                { value: "none", label: "No experience yet" },
                { value: "family", label: "Family or friends' children" },
                { value: "professional", label: "Work with children" },
                { value: "fostered_before", label: "I have fostered before" },
              ]}
              value={v.experience}
              onChange={(x) => set("experience", x)}
              error={firstError(errors, "experience")}
            />
            <fieldset>
              <legend className="mb-1.5 font-bold text-ink">Which types of fostering interest you?</legend>
              <p className="mb-3 text-sm text-ink-soft">Choose any, or none. You can always change your mind.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {fosteringTypes.map((t) => (
                  <CheckboxField key={t.slug} id={`ap-int-${t.slug}`} name="interestedIn" checked={v.interestedIn.includes(t.slug)} onChange={() => toggleInterest(t.slug)}>
                    {t.title}
                  </CheckboxField>
                ))}
              </div>
            </fieldset>
            <SelectField
              id="ap-heard"
              name="howHeard"
              label="How did you hear about us?"
              options={[
                { value: "search", label: "Online search" },
                { value: "social", label: "Social media" },
                { value: "friend", label: "Friend or family" },
                { value: "event", label: "Event or advert" },
                { value: "other", label: "Something else" },
              ]}
              value={v.howHeard}
              onChange={(x) => set("howHeard", x)}
            />
            <TextArea id="ap-notes" name="notes" label="Anything else you would like us to know?" rows={4} maxLength={1000} hint="Optional. Please don't include sensitive personal details here." value={v.notes} onChange={(x) => set("notes", x)} error={firstError(errors, "notes")} />
            <CheckboxField id="ap-consent" name="consent" checked={v.consent} onChange={(x) => set("consent", x)} error={firstError(errors, "consent")}>
              I am happy for Central Fostering to contact me about this application and to store the details I have given.
              See our{" "}
              <Link href="/privacy-policy" className="font-bold text-navy-700 underline underline-offset-2">
                privacy policy
              </Link>
              .
            </CheckboxField>
          </>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <FormMessage message={status === "error" ? message : ""} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="rounded-full border-2 border-navy-700 px-6 py-3 font-bold text-navy-700 hover:bg-navy-50">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <button type="submit" className="rounded-full bg-leaf-700 px-8 py-3.5 font-bold text-white hover:bg-leaf-800">
              Continue
            </button>
          ) : (
            <SubmitButton sending={sending}>Submit my application</SubmitButton>
          )}
        </div>
      </div>
    </form>
  );
}
