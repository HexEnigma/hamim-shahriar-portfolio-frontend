import { z } from "zod";

export const commentSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  website: z.string().trim().url("Enter a valid URL, including https://").or(z.literal("")),
  content: z.string().trim().min(5, "Comment must be at least 5 characters.").max(1000, "Comment must be 1000 characters or fewer."),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000, "Message must be 2000 characters or fewer."),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
});

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const res = error?.response;
  if (!res) return "Network error. Check your connection and try again.";
  if (res.status === 429) return "Too many attempts, please try later.";
  if (typeof res.data?.detail === "string") return res.data.detail;
  return fallback;
}

/** Puts DRF field errors under their fields. Returns true if any were applied. */
export function applyServerErrors(error, setError) {
  const data = error?.response?.data;
  if (error?.response?.status !== 400 || !data || typeof data !== "object") return false;
  let applied = false;
  Object.entries(data).forEach(([field, msgs]) => {
    if (field === "detail" || field === "non_field_errors") return;
    setError(field, { type: "server", message: Array.isArray(msgs) ? msgs.join(" ") : String(msgs) });
    applied = true;
  });
  return applied;
}