export type SubmissionKind = "admission" | "contact" | "badri";
export type SubmissionFields = Record<string, string | boolean>;

export class SubmissionError extends Error {
  constructor(message: string, public readonly status = 400) { super(message); }
}

const admissionFields = ["studentName", "studentUid", "dateOfBirth", "birthCertificateNumber", "gender", "fatherName", "fatherProfession", "fatherMobile", "fatherNid", "guardianName", "guardianRelation", "motherName", "motherProfession", "motherMobile", "motherNid", "presentCountry", "presentDivision", "presentDistrict", "presentUpazila", "presentPostOffice", "presentPostalCode", "presentVillage", "permanentCountry", "permanentDivision", "permanentDistrict", "permanentUpazila", "permanentPostOffice", "permanentPostalCode", "permanentVillage", "admissionClass", "admissionGroup", "admissionYear", "residentialStatus"];
const fields: Record<SubmissionKind, string[]> = {
  admission: admissionFields,
  contact: ["name", "phone", "email", "subject", "message"],
  badri: ["name", "guardianOrApplicant", "phone", "whatsapp", "address", "donationPlan", "customAmount", "paymentChannel", "note", "chosenSeatNumber", "memberType"],
};

export function cleanDigits(value: string) {
  return value.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)));
}

export function validateSubmission(kind: SubmissionKind, body: unknown): SubmissionFields {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new SubmissionError("ফরমের তথ্য সঠিক নয়।");
  const input = body as Record<string, unknown>;
  if (input.website) throw new SubmissionError("আবেদন পাঠানো যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
  const data: SubmissionFields = {};
  for (const key of fields[kind]) {
    if (input[key] !== undefined && typeof input[key] !== "string") throw new SubmissionError("ফরমের তথ্য সঠিক নয়।");
    const value = ((input[key] as string | undefined) || "").trim();
    if (value.length > (key === "message" || key === "note" ? 6000 : 500)) throw new SubmissionError("তথ্য অতিরিক্ত দীর্ঘ। অনুগ্রহ করে সংক্ষেপে লিখুন।");
    data[key] = value;
  }
  const required = kind === "admission" ? ["studentName", "fatherName", "fatherMobile", "admissionClass"] : kind === "contact" ? ["name", "message"] : ["name", "phone"];
  if (required.some((key) => !data[key])) throw new SubmissionError("প্রয়োজনীয় ঘরগুলো পূরণ করুন।");
  const phone = String(data[kind === "admission" ? "fatherMobile" : "phone"] || "");
  if ((kind !== "contact" || phone) && !/^\+?[\d\s()-]{7,20}$/.test(cleanDigits(phone))) throw new SubmissionError("সঠিক মোবাইল নম্বর লিখুন।");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) throw new SubmissionError("সঠিক ই-মেইল ঠিকানা লিখুন।");
  if (kind === "contact" && !data.phone && !data.email) throw new SubmissionError("যোগাযোগের জন্য মোবাইল নম্বর অথবা ই-মেইল দিন।");
  if (kind === "admission") {
    data.sameAsPresent = input.sameAsPresent === true;
    const photo = input.studentImage;
    if (photo !== undefined && photo !== null && photo !== "") {
      if (typeof photo !== "string" || photo.length > 360_000 || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(photo)) throw new SubmissionError("ছবিটি JPG, PNG অথবা WebP হতে হবে এবং ২৫০ কেবির মধ্যে রাখতে হবে।");
      data.studentImage = photo;
    }
  }
  return data;
}
