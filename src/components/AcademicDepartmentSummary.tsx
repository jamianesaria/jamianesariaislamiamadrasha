import type { AcademicDepartment } from "@/sanity/lib/departments";
import { getFieldAttribute } from "@/content/server";

export default async function AcademicDepartmentSummary({ department }: { department?: AcademicDepartment }) {
  if (!department || (!department.overview && !department.features.length)) return null;
  const attribute = await getFieldAttribute();
  return (
    <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
      {department.overview && <p data-sanity={attribute(department, "overview")} className="whitespace-pre-line">{department.overview}</p>}
      {department.features.length > 0 && <ul data-sanity={attribute(department, "features")} className="list-disc pl-5 space-y-1">
        {department.features.map((feature, index) => <li key={`${index}-${feature}`}>{feature}</li>)}
      </ul>}
    </div>
  );
}
