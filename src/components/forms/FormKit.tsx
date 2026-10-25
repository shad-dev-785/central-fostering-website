"use client";

import { useState, type ReactNode } from "react";
import type { FieldErrors } from "@/lib/validation";

/* ---------- Submit hook ---------- */

type Status = "idle" | "sending" | "success" | "error";

export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  async function submit(payload: Record<string, unknown>): Promise<{ ok: boolean; fieldErrors: FieldErrors }> {
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setReference(data.reference ?? "");
        setStatus("success");
        return { ok: true, fieldErrors: {} };
      }
      const fieldErrors: FieldErrors = data.fieldErrors ?? {};
      setErrors(fieldErrors);
      setMessage(data.error ?? "Something went wrong. Please try again or call us.");
      setStatus("error");
      return { ok: false, fieldErrors };
    } catch {
      setMessage("We could not reach the server. Please check your connection and try again, or call us.");
      setStatus("error");
      return { ok: false, fieldErrors: {} };
    }
  }

  return { status, errors, setErrors, message, reference, submit, sending: status === "sending" };
}

/* ---------- Fields ---------- */

const control =
  "w-full rounded-xl border-2 border-navy-200 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-leaf-600 focus:outline-none focus:ring-4 focus:ring-leaf-100 aria-[invalid=true]:border-red-600";

function Wrapper({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-bold text-ink">
        {label}
        {required && <span className="text-red-700" aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

type FieldCommon = {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export function TextField({
  id,
  name,
  label,
  hint,
  error,
  required,
  type = "text",
  autoComplete,
  inputMode,
  value,
  onChange,
  placeholder,
}: FieldCommon & {
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={control}
        {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : {})}
      />
    </Wrapper>
  );
}

export function TextArea({
  id,
  name,
  label,
  hint,
  error,
  required,
  rows = 5,
  value,
  onChange,
  maxLength,
}: FieldCommon & { rows?: number; value?: string; onChange?: (v: string) => void; maxLength?: number }) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={control}
        {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : {})}
      />
    </Wrapper>
  );
}

export function SelectField({
  id,
  name,
  label,
  hint,
  error,
  required,
  options,
  value,
  onChange,
}: FieldCommon & {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={control}
        {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : { defaultValue: "" })}
      >
        <option value="" disabled>
          Please choose
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

/** A group of radio "pills". Fully keyboard accessible: real radio inputs. */
export function RadioGroup({
  name,
  legend,
  hint,
  error,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  legend: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={describedBy(name, hint, error)}>
      <legend className="mb-1.5 font-bold text-ink">
        {legend}
        {required && <span className="text-red-700" aria-hidden="true"> *</span>}
      </legend>
      {hint && (
        <p id={`${name}-hint`} className="mb-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label
            key={o.value}
            className="cursor-pointer rounded-full border-2 border-navy-200 bg-white px-4 py-2.5 font-semibold text-ink transition-colors has-[:checked]:border-leaf-700 has-[:checked]:bg-leaf-700 has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-tangerine-300"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              className="sr-only"
              {...(onChange ? { checked: value === o.value, onChange: () => onChange(o.value) } : {})}
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxField({
  id,
  name,
  children,
  error,
  checked,
  onChange,
  required,
}: {
  id: string;
  name: string;
  children: ReactNode;
  error?: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-leaf-700"
          {...(onChange ? { checked: Boolean(checked), onChange: (e) => onChange(e.target.checked) } : {})}
        />
        <span className="text-ink-soft">{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen decoy field. People never see or fill it; many bots do. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-800">
      {message}
    </p>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex items-center justify-center rounded-full bg-leaf-700 px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-leaf-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {sending ? "Sending…" : children}
    </button>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-3xl border-2 border-leaf-200 bg-leaf-50 p-8 text-center sm:p-12">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-leaf-700 text-white">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.500 4.500 4.500L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="mx-auto mt-3 max-w-md text-ink-soft">{children}</div>
    </div>
  );
}

export const firstError = (errors: FieldErrors, key: string) => errors[key]?.[0];
