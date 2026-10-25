import { z } from "zod";
import { fosteringTypes } from "@/content/fostering";

/**
 * Validation for all three public forms. These run on the server (the browser
 * checks are only a convenience), and they define exactly what we are willing to store.
 *
 * Data minimisation: we deliberately do NOT collect date of birth, ethnicity,
 * health or criminal record details online. Those belong in the formal,
 * secure assessment process, not a website form.
 */

const name = z
  .string({ error: "Please enter your name" })
  .trim()
  .min(2, "Please enter your name")
  .max(100, "That name is too long");

const email = z
  .string({ error: "Please enter your email address" })
  .trim()
  .max(200, "That email address is too long")
  .pipe(z.email("Please enter a valid email address"));

const phone = z
  .string({ error: "Please enter a phone number" })
  .trim()
  .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid phone number");

const consent = z.literal(true, {
  error: "Please tick the box so we know you are happy for us to contact you",
});

// Real people leave this empty. Bots tend to fill every field they find.
const honeypot = z.string().max(0).optional();

export const enquirySchema = z.object({
  name,
  email,
  phone: z.union([phone, z.literal("")]).optional(),
  contactPreference: z.enum(["email", "phone"], { error: "Please choose how we should contact you" }),
  message: z
    .string({ error: "Please tell us how we can help" })
    .trim()
    .min(10, "Please write a little more so we can help")
    .max(2000, "Please keep your message under 2,000 characters"),
  consent,
  website: honeypot,
});

export const callbackSchema = z.object({
  name,
  phone,
  bestTime: z.enum(["morning", "afternoon", "evening", "anytime"], { error: "Please choose a time" }),
  consent,
  website: honeypot,
});

const typeSlugs = fosteringTypes.map((t) => t.slug) as [string, ...string[]];

export const applySchema = z.object({
  name,
  email,
  phone,
  postcode: z
    .string({ error: "Please enter your postcode" })
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/, "Please enter a valid UK postcode"),
  over21: z.literal(true, { error: "You need to be 21 or over to apply to foster" }),
  homeType: z.enum(["own", "rent", "other"], { error: "Please tell us about your home" }),
  spareBedroom: z.enum(["yes", "no", "could_create"], { error: "Please tell us about your spare bedroom" }),
  householdSize: z.coerce
    .number({ error: "Please enter a number" })
    .int("Please enter a whole number")
    .min(1, "Please enter at least 1")
    .max(15, "Please enter a number up to 15"),
  hasPets: z.enum(["yes", "no"], { error: "Please choose yes or no" }),
  experience: z.enum(["none", "family", "professional", "fostered_before"], {
    error: "Please choose the option closest to you",
  }),
  interestedIn: z.array(z.enum(typeSlugs)).max(8).default([]),
  howHeard: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000, "Please keep this under 1,000 characters").optional(),
  consent,
  website: honeypot,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type CallbackInput = z.infer<typeof callbackSchema>;
export type ApplyInput = z.infer<typeof applySchema>;

export type SubmissionKind = "enquiry" | "callback" | "application";

export type FieldErrors = Record<string, string[] | undefined>;
