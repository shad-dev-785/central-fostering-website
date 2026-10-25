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
  TextField,
  firstError,
  useSubmit,
} from "./FormKit";

export default function CallbackForm({ compact = false, idPrefix = "cb" }: { compact?: boolean; idPrefix?: string }) {
  const { status, errors, message, submit, sending } = useSubmit("/api/callback");
  const [bestTime, setBestTime] = useState("anytime");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    await submit({
      name: f.get("name"),
      phone: f.get("phone"),
      bestTime: f.get("bestTime"),
      consent: f.get("consent") === "on",
      website: f.get("website"),
    });
  }

  if (status === "success") {
    return (
      <SuccessPanel title="We will call you back">
        <p>Thank you. One of our friendly team will ring you at the time you chose.</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      <Honeypot />
      <div className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}>
        <TextField id={`${idPrefix}-name`} name="name" label="Your name" required autoComplete="name" error={firstError(errors, "name")} />
        <TextField
          id={`${idPrefix}-phone`}
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          error={firstError(errors, "phone")}
        />
      </div>
      <RadioGroup
        name="bestTime"
        legend="Best time to call"
        required
        options={[
          { value: "morning", label: "Morning" },
          { value: "afternoon", label: "Afternoon" },
          { value: "evening", label: "Evening" },
          { value: "anytime", label: "Any time" },
        ]}
        value={bestTime}
        onChange={setBestTime}
        error={firstError(errors, "bestTime")}
      />
      <CheckboxField id={`${idPrefix}-consent`} name="consent" required error={firstError(errors, "consent")}>
        I am happy for Central Fostering to call me. See our{" "}
        <Link href="/privacy-policy" className="font-bold text-navy-700 underline underline-offset-2">
          privacy policy
        </Link>
        .
      </CheckboxField>
      <FormMessage message={status === "error" && Object.keys(errors).length === 0 ? message : status === "error" ? "Please check the highlighted fields." : ""} />
      <SubmitButton sending={sending}>Request a call back</SubmitButton>
    </form>
  );
}
