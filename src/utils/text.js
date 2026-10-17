export const firstSentences = (text = "", n = 2) =>
  text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+/g)?.slice(0, n).join(" ").trim() || text.trim();
export const bullets = (text = "", max = 3) => text.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean).slice(0, max);
export const cleanParams = (params) => Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null));