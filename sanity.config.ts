import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { LayoutDashboard } from "lucide-react";
import ManagementTool from "./src/sanity/management/ManagementTool";
import { localizedActions } from "./src/sanity/management/actions";
import { ArchiveAction } from "./src/sanity/management/ArchiveAction";
import { presentationTool, defineDocuments, defineLocations } from "sanity/presentation";
import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import coverage from "./src/content/coverage.json";
import { blogPath } from "./src/data/seoData";

const singletons = new Set(["homepage", "siteSettings", "badriKafila", "pageContent", "pageSeo"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা — কন্ট্রোল প্যানেল",

  schema,
  document: {
    actions: (previous, context) => localizedActions(singletons.has(context.schemaType) ? previous.filter((action) => !["delete", "duplicate"].includes(action.action || "")) : [...previous, ArchiveAction]),
    newDocumentOptions: (previous) => previous.filter((option) => !singletons.has(option.templateId)),
  },
  tools: (previous) => [{ name: "dashboard", title: "ব্যবস্থাপনা", icon: LayoutDashboard, component: ManagementTool }, ...previous],

  plugins: [
    structureTool({ structure, title: "প্রকাশনা সম্পাদনা" }),
    presentationTool({
      title: "ওয়েবসাইট সম্পাদনা",
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          pageContent: defineLocations({ select: { title: "title", route: "route", id: "_id" }, resolve: (document) => {
            const id = document?.id?.replace(/^drafts\./, "");
            const locations = Object.entries(coverage).filter(([, item]) => id && (item.documents as string[]).includes(id)).map(([href]) => ({ title: `${document?.title || "ওয়েবসাইটের পাতা"} · ${href}`, href }));
            return { locations: locations.length ? locations : [{ title: document?.title || "ওয়েবসাইটের পাতা", href: document?.route || "/" }] };
          } }),
          classRoutine: defineLocations({ locations: [{ title: "ক্লাস রুটিন", href: "/functions/class-routine" }] }),
          examRoutine: defineLocations({ locations: [{ title: "পরীক্ষার রুটিন", href: "/exam-routine" }] }),
          examResult: defineLocations({ locations: [{ title: "পরীক্ষার ফলাফল", href: "/results/academic" }, { title: "ভর্তির ফলাফল", href: "/results/admission" }] }),
          galleryPhoto: defineLocations({ locations: [{ title: "ফটো গ্যালারি", href: "/gallery/photo" }] }),
          galleryVideo: defineLocations({ locations: [{ title: "ভিডিও গ্যালারি", href: "/gallery/video" }] }),
          calendarEvent: defineLocations({ locations: [{ title: "অনুষ্ঠান ও ছুটি", href: "/functions/event-list" }, { title: "ছুটির তালিকা", href: "/functions/holiday" }] }),
          vacancy: defineLocations({ locations: [{ title: "নিয়োগ বিজ্ঞপ্তি", href: "/about/vacancy" }] }),
          blogPost: defineLocations({ select: { title: "title", slug: "slug.current" }, resolve: (document) => ({ locations: [...(document?.slug ? [{ title: document.title || "প্রবন্ধ", href: blogPath(document.slug) }] : []), { title: "ব্লগ", href: "/blog" }] }) }),
          pageSeo: defineLocations({ select: { route: "route", title: "seoTitle" }, resolve: (document) => ({ locations: [{ title: document?.title || "পাতার SEO (Page SEO)", href: document?.route || "/" }] }) }),
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
            locations: [{ title: "৩১৩ বদরি কাফেলা (Badri Kafela)", href: "/badri-kafila" }],
          }),
        },
        mainDocuments: defineDocuments([
          {
            route: "/",
            type: "homepage",
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
            route: "/badri-kafila",
            type: "badriKafila",
          },
        ]),
      },
    }),
  ],
});
