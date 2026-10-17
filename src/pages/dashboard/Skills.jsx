import ResourcePage from "@/components/dashboard/ResourcePage";
import { skillsApi } from "@/api/skills";
import { SKILL_CATEGORIES } from "@/utils/constants";

const LABELS = Object.fromEntries(SKILL_CATEGORIES);
const FIELDS = [
  { name: "name", label: "Name *", rules: { required: "Name is required." } },
  { name: "category", label: "Category", type: "select", options: SKILL_CATEGORIES, default: "BACKEND" },
  { name: "proficiency", label: "Proficiency (1–100) *", type: "number", hint: "Your honest self-assessment.", rules: { required: "Proficiency is required.", min: { value: 1, message: "Proficiency must be between 1 and 100." }, max: { value: 100, message: "Proficiency must be between 1 and 100." } } },
  { name: "icon", label: "Icon key (optional)" },
  { name: "display_order", label: "Display order", type: "number", default: 0 },
  { name: "is_featured", label: "Featured", type: "checkbox" },
];
const COLUMNS = [
  { key: "name", header: "Name" }, { key: "category", header: "Category", render: (s) => LABELS[s.category] },
  { key: "proficiency", header: "Level" }, { key: "is_featured", header: "Featured", render: (s) => (s.is_featured ? "Yes" : "—") },
];

export default function Skills() {
  return (<><h1 className="mb-3">Skills</h1><ResourcePage title="Skills" resourceKey="skills" api={skillsApi} columns={COLUMNS} fields={FIELDS} searchable /></>);
}