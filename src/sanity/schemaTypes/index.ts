import { type SchemaTypeDefinition } from "sanity";
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
import { admissionApplicationType } from "./admissionApplication";
import { contactMessageType } from "./contactMessage";
import { galleryPhotoType } from "./galleryPhoto";
import { galleryVideoType } from "./galleryVideo";
import { badriKafilaType } from "./badriKafila";

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
    admissionApplicationType,
    contactMessageType,
    galleryPhotoType,
    galleryVideoType,
    badriKafilaType,
  ],
};

