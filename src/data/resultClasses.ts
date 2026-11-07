import { availableClasses } from "./siteData";

// Result-specific departments; shared routine and admission choices stay separate.
export const resultClasses = [
  ...availableClasses,
  { id: "maktab", name: "মকতব বিভাগ" },
  { id: "nazera", name: "নাজের বিভাগ" },
];
