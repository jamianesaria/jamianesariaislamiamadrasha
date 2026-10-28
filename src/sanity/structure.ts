import type { StructureResolver } from "sanity/structure";
import { pageSeoDocumentId, seoRoutes } from "../data/seoData";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("madrashaAdmin")
    .title("মাদরাসা কন্ট্রোল প্যানেল (Madrasha Admin)")
    .items([
      // 1. Singleton: Site Settings
      S.listItem()
        .id("siteSettings")
        .title("প্রতিষ্ঠান সেটিংস ও পরিচিতি (Site Settings)")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("প্রতিষ্ঠান পরিচিতি ও যোগাযোগ সেটিংস")
        ),

      S.listItem().id("pageSeo").title("সার্চ ও ব্রেডক্রাম্ব (Page SEO & Breadcrumbs)").child(
        S.list().id("seoPages").title("পাতার সার্চ সেটিংস (Page SEO)").items(
          Object.entries(seoRoutes).map(([route, page]) => S.listItem().id(pageSeoDocumentId(route)).title(`${page.label} (${route})`).child(S.document().schemaType("pageSeo").documentId(pageSeoDocumentId(route))))
        )
      ),

      // 2. Singleton: Homepage Content
      S.listItem()
        .id("homepage")
        .title("হোমপেজ ও ভিডিও (Homepage & Videos)")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .title("হোমপেজ প্রধান পাতা ও মুহতামিমের বাণী")
        ),

      S.divider(),

      // 3. Notices
      S.documentTypeListItem("notice").title("নোটিশ ও অফিসিয়াল প্রজ্ঞাপন (Notices)"),

      // 4. Academic Departments
      S.documentTypeListItem("academicDepartment").title("শিক্ষা বিভাগ ও পাঠ্যক্রম (Departments)"),

      // 5. Teachers & Faculty
      S.documentTypeListItem("teacher").title("শিক্ষক ও উলামায়ে কেরাম (Teachers)"),

      // 6. Managing Committee & Donors
      S.documentTypeListItem("committeeMember").title("পরিচালনা পরিষদ ও জমিদাতা (Committee & Donors)"),

      S.divider(),

      // 7. Routines Group
      S.listItem()
        .id("routines")
        .title("ক্লাস ও পরীক্ষার রুটিন (Routines)")
        .child(
          S.list()
            .id("routinesList")
            .title("রুটিন ব্যবস্থাপনা")
            .items([
              S.documentTypeListItem("classRoutine").title("দৈনিক ক্লাস রুটিন (Class Routines)"),
              S.documentTypeListItem("examRoutine").title("পরীক্ষার সময়সূচি (Exam Routines)"),
            ])
        ),

      // 8. Exam Results
      S.documentTypeListItem("examResult").title("পরীক্ষার ফলাফল ও মেধা তালিকা (Results)"),

      // 9. Admission Group
      S.listItem()
        .id("admissions")
        .title("ভর্তি কার্যক্রম (Admissions)")
        .child(
          S.list()
            .id("admissionsList")
            .title("ভর্তি ব্যবস্থাপনা")
            .items([
              S.documentTypeListItem("admissionInfo").title("ভর্তি তথ্য ও ফি কাঠামো (Admission Info)"),
            ])
        ),

      S.divider(),

      // 10. Media Galleries
      S.listItem()
        .id("mediaGallery")
        .title("মিডিয়া ও গ্যালারি (Gallery Media)")
        .child(
          S.list()
            .id("mediaGalleryList")
            .title("মিডিয়া গ্যালারি")
            .items([
              S.documentTypeListItem("galleryPhoto").title("ফটো গ্যালারি (Photos)"),
              S.documentTypeListItem("galleryVideo").title("ভিডিও গ্যালারি (Videos)"),
            ])
        ),

      // 11. 313 Badri Kafila
      S.listItem()
        .id("badriKafila")
        .title("৩১৩ বদরি কাফেলা প্রকল্প (Badri Kafela)")
        .child(
          S.document()
            .schemaType("pageContent")
            .documentId("copy.ui.BadriKafilaSection")
            .title("৩১৩ বদরি কাফেলা প্রকল্প বিবরণ")
        ),

      // 12. Blog & Articles
      S.documentTypeListItem("blogPost").title("মাদরাসা ব্লগ ও প্রবন্ধ (Blog Posts)"),

      // 13. Contact Messages
      S.documentTypeListItem("pageContent").title("পাতার লেখা ও ছবি (Page content)"),
      S.documentTypeListItem("calendarEvent").title("অনুষ্ঠান ও ছুটি (Calendar)"),
      S.documentTypeListItem("vacancy").title("নিয়োগ বিজ্ঞপ্তি (Vacancies)"),
    ]);
