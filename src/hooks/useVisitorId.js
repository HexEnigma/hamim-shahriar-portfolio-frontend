import { useMemo } from "react";
import { getVisitorId } from "@/api/tokens";

export default function useVisitorId() {
  return useMemo(() => getVisitorId(), []);
}