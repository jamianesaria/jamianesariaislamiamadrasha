import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা — কন্ট্রোল প্যানেল",

  schema,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          homepage: defineLocations({
            locations: [{ title: "হোমপেজ (Homepage)", href: "/" }],
          }),
          siteSettings: defineLocations({
            locations: [{ title: "সমগ্র সাইট (Site Settings)", href: "/" }],
          }),
          notice: defineLocations({
            locations: [{ title: "নোটিশ বোর্ড (Notices)", href: "/notices" }],
          }),
          teacher: defineLocations({
            locations: [{ title: "শিক্ষক ও উলামায়ে কেরাম (Faculty)", href: "/teachers" }],
          }),
          committeeMember: defineLocations({
            locations: [{ title: "পরিচালনা পরিষদ (Committee)", href: "/committee" }],
          }),
          academicDepartment: defineLocations({
            locations: [{ title: "শিক্ষা বিভাগ (Departments)", href: "/academics" }],
          }),
          admissionInfo: defineLocations({
            locations: [{ title: "ভর্তি তথ্য (Admissions)", href: "/admission" }],
          }),
          badriKafila: defineLocations({
            locations: [{ title: "৩১৩ বদরি কাফেলা (Badri Kafela)", href: "/313-badri-kafila" }],
          }),
        },
        mainDocuments: defineDocuments([
          {
            route: "/",
            type: "homepage",
          },
          {
            route: "/",
            type: "siteSettings",
          },
          {
            route: "/notices",
            type: "notice",
          },
          {
            route: "/teachers",
            type: "teacher",
          },
          {
            route: "/committee",
            type: "committeeMember",
          },
          {
            route: "/academics",
            type: "academicDepartment",
          },
          {
            route: "/admission",
            type: "admissionInfo",
          },
          {
            route: "/functions/class-routine",
            type: "classRoutine",
          },
          {
            route: "/exam-routine",
            type: "examRoutine",
          },
          {
            route: "/results/academic",
            type: "examResult",
          },
          {
            route: "/gallery/photo",
            type: "galleryPhoto",
          },
          {
            route: "/gallery/video",
            type: "galleryVideo",
          },
          {
            route: "/313-badri-kafila",
            type: "badriKafila",
          },
        ]),
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
