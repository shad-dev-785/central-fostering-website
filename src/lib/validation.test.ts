import { test } from "node:test";
import assert from "node:assert/strict";
import { applySchema, callbackSchema, enquirySchema } from "./validation";

const enquiry = {
  name: "Sam Example",
  email: "sam@example.com",
  phone: "",
  contactPreference: "email",
  message: "I would like to know more about fostering.",
  consent: true,
};

test("enquiry: accepts a valid submission", () => {
  assert.equal(enquirySchema.safeParse(enquiry).success, true);
});

test("enquiry: rejects missing consent, bad email and a too-short message", () => {
  assert.equal(enquirySchema.safeParse({ ...enquiry, consent: false }).success, false);
  assert.equal(enquirySchema.safeParse({ ...enquiry, email: "not-an-email" }).success, false);
  assert.equal(enquirySchema.safeParse({ ...enquiry, message: "hi" }).success, false);
});

test("callback: needs a plausible phone number and a time", () => {
  const ok = { name: "Sam", phone: "020 7946 0000", bestTime: "evening", consent: true };
  assert.equal(callbackSchema.safeParse(ok).success, true);
  assert.equal(callbackSchema.safeParse({ ...ok, phone: "abc" }).success, false);
  assert.equal(callbackSchema.safeParse({ ...ok, bestTime: "midnight" }).success, false);
});

const apply = {
  name: "Sam Example",
  email: "sam@example.com",
  phone: "07700 900123",
  postcode: "e1 0aa",
  over21: true,
  homeType: "rent",
  spareBedroom: "yes",
  householdSize: "2",
  hasPets: "no",
  experience: "none",
  interestedIn: ["short-term"],
  consent: true,
};

test("apply: accepts valid input and normalises the postcode and household size", () => {
  const r = applySchema.safeParse(apply);
  assert.equal(r.success, true);
  if (r.success) {
    assert.equal(r.data.postcode, "E1 0AA");
    assert.equal(r.data.householdSize, 2);
  }
});

test("apply: rejects under-21s, bad postcodes, unknown fostering types and silly household sizes", () => {
  assert.equal(applySchema.safeParse({ ...apply, over21: false }).success, false);
  assert.equal(applySchema.safeParse({ ...apply, postcode: "12345" }).success, false);
  assert.equal(applySchema.safeParse({ ...apply, interestedIn: ["nonsense"] }).success, false);
  assert.equal(applySchema.safeParse({ ...apply, householdSize: "0" }).success, false);
  assert.equal(applySchema.safeParse({ ...apply, householdSize: "99" }).success, false);
});
