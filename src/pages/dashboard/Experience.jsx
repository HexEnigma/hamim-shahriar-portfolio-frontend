import ResourcePage from "@/components/dashboard/ResourcePage";
import { educationApi, experiencesApi } from "@/api/experience";
import { EMPLOYMENT_LABELS } from "@/utils/constants";
import { formatRange } from "@/utils/formatDate";

const EXP_FIELDS = [
  { name: "company", label: "Company *", rules: { required: "Company is required." } },
  { name: "role", label: "Role *", rules: { required: "Role is required." } },
  { name: "employment_type", label: "Type", type: "select", options: Object.entries(EMPLOYMENT_LABELS), default: "INTERNSHIP" },
  { name: "location", label: "Location" },
  { name: "start_date", label: "Start date *", type: "date", rules: { required: "Start date is required." } },
  { name: "end_date", label: "End date", type: "date" },
  { name: "is_current", label: "I currently work here", type: "checkbox" },
  { name: "description", label: "Description (one bullet per line)", type: "textarea" },
  { name: "company_url", label: "Company URL", type: "url" },
  { name: "display_order", label: "Display order", type: "number", default: 0 },
];
const EXP_COLS = [
  { key: "role", header: "Role" }, { key: "company", header: "Company" },
  { key: "dates", header: "Dates", render: (e) => formatRange(e.start_date, e.end_date, e.is_current) },
];
const EDU_FIELDS = [
  { name: "institution", label: "Institution *", rules: { required: "Institution is required." } },
  { name: "degree", label: "Degree *", rules: { required: "Degree is required." } },
  { name: "field_of_study", label: "Field of study *", rules: { required: "Field of study is required." } },
  { name: "start_year", label: "Start year *", type: "number", rules: { required: "Start year is required." } },
  { name: "end_year", label: "End year (leave empty if ongoing)", type: "number" },
  { name: "grade", label: "Grade" },
  { name: "description", label: "Description", type: "textarea" },
];
const EDU_COLS = [
  { key: "degree", header: "Degree" }, { key: "institution", header: "Institution" },
  { key: "years", header: "Years", render: (e) => `${e.start_year} – ${e.end_year ?? "Present"}` },
];

export default function Experience() {
  return (
    <>
      <h1 className="mb-3">Experience & education</h1>
      <ResourcePage title="Experience" resourceKey="experiences" api={experiencesApi} columns={EXP_COLS} fields={EXP_FIELDS} rowLabel={(r) => `${r.role} at ${r.company}`} />
      <ResourcePage title="Education" resourceKey="education" api={educationApi} columns={EDU_COLS} fields={EDU_FIELDS} rowLabel={(r) => r.degree} />
    </>
  );
}