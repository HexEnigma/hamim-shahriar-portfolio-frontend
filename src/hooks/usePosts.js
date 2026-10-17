import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoriesApi, postsApi, tagsApi } from "@/api/posts";
import { cleanParams } from "@/utils/text";

export const usePosts = (params = {}) =>
  useQuery({ queryKey: ["posts", params], queryFn: () => postsApi.list(cleanParams(params)), placeholderData: keepPreviousData });
export const usePost = (slug) =>
  useQuery({ queryKey: ["post", slug], queryFn: () => postsApi.get(slug), retry: false, staleTime: 5 * 60_000 });
export const useCategories = () => useQuery({ queryKey: ["categories"], queryFn: () => categoriesApi.list() });
export const useTags = () => useQuery({ queryKey: ["tags"], queryFn: () => tagsApi.list() });
export const useComments = (slug, page = 1) =>
  useQuery({ queryKey: ["comments", slug, page], queryFn: () => postsApi.comments(slug, { page }), placeholderData: keepPreviousData });
export const useCreateComment = (slug) => useMutation({ mutationFn: (body) => postsApi.createComment(slug, body) });

/** Optimistic like: instant fill and count, rolled back on error. */
export function useToggleLike(slug) {
  const qc = useQueryClient();
  const key = ["post", slug];
  return useMutation({
    mutationFn: () => postsApi.toggleLike(slug),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData(key);
      if (previous) {
        qc.setQueryData(key, {
          ...previous,
          is_liked: !previous.is_liked,
          likes_count: previous.likes_count + (previous.is_liked ? -1 : 1),
        });
      }
      return { previous };
    },
    onError: (_e, _v, ctx) => { if (ctx?.previous) qc.setQueryData(key, ctx.previous); },
    onSuccess: (data) =>
      qc.setQueryData(key, (old) => old && { ...old, is_liked: data.liked, likes_count: data.likes_count }),
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}