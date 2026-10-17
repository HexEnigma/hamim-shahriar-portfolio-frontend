export const SKILL_CATEGORIES = [
  ["FRONTEND", "Frontend"], ["BACKEND", "Backend"], ["DATABASE", "Databases"],
  ["DEVOPS", "DevOps"], ["TOOLS", "Tools"], ["SOFT_SKILL", "Soft skills"],
];
export const EMPLOYMENT_LABELS = {
  FULL_TIME: "Full time", PART_TIME: "Part time", INTERNSHIP: "Internship", FREELANCE: "Freelance", CONTRACT: "Contract",
};
export const PROJECT_CATEGORIES = [["WEB", "Web"], ["MOBILE", "Mobile"], ["API", "API"], ["ML", "Machine learning"], ["OTHER", "Other"]];
export const PROJECT_STATUS_LABELS = { IN_PROGRESS: "In progress", COMPLETED: "Completed" };
export const PROJECT_SORTS = [["-completed_date", "Newest"], ["completed_date", "Oldest"], ["display_order", "Featured order"], ["title", "A–Z"]];
export const POST_SORTS = [["-published_at", "Newest"], ["-views_count", "Most viewed"], ["-likes_count", "Most liked"], ["title", "A–Z"]];
export const PAGE_SIZES = { posts: 6, projects: 9, comments: 10, messages: 10 };