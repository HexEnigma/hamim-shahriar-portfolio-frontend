import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryParams(defaults = {}) {
  const [sp, setSp] = useSearchParams();
  const params = { ...defaults, ...Object.fromEntries(sp) };
  const setParams = useCallback((patch) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(patch).forEach(([k, v]) => (v === "" || v == null ? next.delete(k) : next.set(k, String(v))));
      if (!("page" in patch)) next.delete("page");
      return next;
    });
  }, [setSp]);
  return [params, setParams];
}