import { stegaClean } from "@sanity/client/stega";

export interface AcademicDepartmentRecord {
  _id: string;
  title?: string | null;
  slug?: string | null;
  arabicTitle?: string | null;
  badge?: string | null;
  ageRange?: string | null;
  seatCount?: string | null;
  overview?: string | null;
  features?: string[] | null;
  imageUrl?: string | null;
  showOnHomepage?: boolean | null;
}

export interface AcademicDepartment {
  _id: string;
  id: string;
  name: string;
  arabicName: string;
  badge: string;
  ageRange: string;
  seatCount: string;
  overview: string;
  features: string[];
  imageUrl: string | null;
  showOnHomepage: boolean;
}

// The query orders duplicate slugs by latest update first. Keep that record
// for display without deleting or overwriting any of the source documents.
export function mapAcademicDepartments(records: AcademicDepartmentRecord[]): AcademicDepartment[] {
  const seen = new Set<string>();
  return records.flatMap((record) => {
    const id = stegaClean(record.slug || record._id);
    if (seen.has(id)) return [];
    seen.add(id);
    return [{
      _id: record._id,
      id,
      name: record.title || "",
      arabicName: record.arabicTitle || "",
      badge: record.badge || "",
      ageRange: record.ageRange || "",
      seatCount: record.seatCount || "",
      overview: record.overview || "",
      features: record.features || [],
      imageUrl: record.imageUrl || null,
      showOnHomepage: record.showOnHomepage ?? (id !== "orphanage"),
    }];
  });
}

