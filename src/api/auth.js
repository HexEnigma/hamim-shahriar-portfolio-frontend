import api from "./axios";

export const authApi = {
  login: (username, password) =>
    api.post("/auth/login/", { username, password }, { skipAuth: true }).then((r) => r.data),
  logout: (refresh) => api.post("/auth/logout/", { refresh }),
  me: () => api.get("/auth/me/").then((r) => r.data),
  changePassword: (body) => api.post("/auth/change-password/", body).then((r) => r.data),
};