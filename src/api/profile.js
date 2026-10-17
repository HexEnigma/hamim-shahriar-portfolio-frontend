import api from "./axios";

export const profileApi = {
  get: () => api.get("/profile/").then((r) => r.data),
  update: (formData) => api.patch("/profile/", formData).then((r) => r.data),
};