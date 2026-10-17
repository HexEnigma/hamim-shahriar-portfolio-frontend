import api from "./axios";
import { crud } from "./crud";

export const postsApi = {
  ...crud("/posts"),
  toggleLike: (slug) => api.post(`/posts/${slug}/like/`).then((r) => r.data),
  comments: (slug, params) => api.get(`/posts/${slug}/comments/`, { params }).then((r) => r.data),
  createComment: (slug, body) => api.post(`/posts/${slug}/comments/`, body).then((r) => r.data),
};
export const categoriesApi = crud("/categories");
export const tagsApi = crud("/tags");
export const commentsApi = crud("/comments");   // owner moderation