import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardApi } from "@/api/dashboard";
import { cleanParams } from "@/utils/text";

export const useStats = () => useQuery({ queryKey: ["stats"], queryFn: dashboardApi.stats });

export const useAdminList = (key, api, params = {}) =>
  useQuery({ queryKey: [key, "admin", params], queryFn: () => api.list(cleanParams(params)), placeholderData: keepPreviousData });

export function useInvalidateAll() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ predicate: (q) => q.queryKey[0] !== "me" });
}

export function useSave(api) {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: ({ id, body }) => (id != null ? api.update(id, body) : api.create(body)),
    onSuccess: invalidate,
  });
}

export function useRemove(api) {
  const invalidate = useInvalidateAll();
  return useMutation({ mutationFn: (id) => api.remove(id), onSuccess: invalidate });
}