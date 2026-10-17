import { useEffect } from "react";
import { useProfile } from "./usePortfolio";

export default function usePageMeta(title, description) {
  const { data: profile } = useProfile();
  const name = profile?.full_name;
  useEffect(() => {
    document.title = [title, name].filter(Boolean).join(" · ") || "Portfolio";
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description, name]);
}