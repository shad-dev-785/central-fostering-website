"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CheckboxField,
  FormMessage,
  Honeypot,
  RadioGroup,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextField,
  firstError,
  useSubmit,
} from "./FormKit";

export default function EnquiryForm() {
  const { status, errors, message, reference, submit, sending } = useSubmit("/api/enquiry");
  const [pref, setPref] = useState("email");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await submit({
      name: f.get("name"),
      email: f.get("email"),
      phone: f.get("phone"),
      contactPreference: f.get("contactPreference"),
      message: f.get("message"),
      consent: f.get("consent") === "on",
      website: f.get("website"),
    });
  }

  if (status === "success") {
    return (
      <SuccessPanel title="Thank you, we have your message">
        <p>A member of our team will be in touch soon, usually within one working day.</p>
        {reference && <p className="mt-3 text-sm">Your reference: <strong>{reference}</strong></p>}
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-6" noValidate>
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="enq-name" name="name" label="Your name" required autoComplete="name" error={firstError(errors, "name")} />
        <TextField id="enq-email" name="email" label="Email address" type="email" required autoComplete="email" error={firstError(errors, "email")} />
      </div>
      <TextField
        id="enq-phone"
        name="phone"
        label="Phone number"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        hint="Optional, but handy if you would like us to ring you."
        error={firstError(errors, "phone")}
      />
      <RadioGroup
        name="contactPreference"
        legend="How would you like us to contact you?"
        required
        options={[
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
        ]}
        value={pref}
        onChange={setPref}
        error={firstError(errors, "contactPreference")}
      />
      <TextArea
        id="enq-message"
        name="message"
        label="How can we help?"
        required
        maxLength={2000}
        hint="Tell us a little about you and what you would like to know. Please don't include sensitive details, as we can talk about those in person."
        error={firstError(errors, "message")}
      />
      <CheckboxField id="enq-consent" name="consent" required error={firstError(errors, "consent")}>
        I am happy for Central Fostering Agency UK to contact me about my enquiry. See our{" "}
        <Link href="/privacy-policy" className="font-bold text-navy-700 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </CheckboxField>
      <FormMessage message={status === "error" && Object.keys(errors).length === 0 ? message : status === "error" ? "Please check the highlighted fields." : ""} />
      <SubmitButton sending={sending}>Send my enquiry</SubmitButton>
    </form>
  );
}
