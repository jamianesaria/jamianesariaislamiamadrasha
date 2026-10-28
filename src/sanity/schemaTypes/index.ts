import { defineField, type SchemaTypeDefinition } from "sanity";
import { siteSettingsType } from "./siteSettings";
import { homepageType } from "./homepage";
import { noticeType } from "./notice";
import { teacherType } from "./teacher";
import { committeeMemberType } from "./committeeMember";
import { academicDepartmentType } from "./academicDepartment";
import { classRoutineType } from "./classRoutine";
import { examRoutineType } from "./examRoutine";
import { examResultType } from "./examResult";
import { admissionInfoType } from "./admissionInfo";
import { pageContentType } from "./pageContent";
import { pageSeoType } from "./pageSeo";
import { calendarEventType } from "./calendarEvent";
import { vacancyType } from "./vacancy";
import { galleryPhotoType } from "./galleryPhoto";
import { galleryVideoType } from "./galleryVideo";
import { badriKafilaType } from "./badriKafila";
import { blogPostType } from "./blogPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    homepageType,
    noticeType,
    teacherType,
    committeeMemberType,
    academicDepartmentType,
    classRoutineType,
    examRoutineType,
    examResultType,
    admissionInfoType,
    pageContentType,
    pageSeoType,
    calendarEventType,
    vacancyType,
    galleryPhotoType,
    galleryVideoType,
    badriKafilaType,
    blogPostType,
  ].map((type) => ["homepage", "siteSettings", "badriKafila", "pageContent"].includes(type.name) ? type : { ...type, fields: [...type.fields, defineField({ name: "archivedAt", title: "আর্কাইভের সময়", type: "datetime", readOnly: true, hidden: true })] }),
};
