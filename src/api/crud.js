import api from "./axios";

export const crud = (base) => ({
  list: (params) => api.get(`${base}/`, { params }).then((r) => r.data),
  get: (id) => api.get(`${base}/${id}/`).then((r) => r.data),
  create: (body) => api.post(`${base}/`, body).then((r) => r.data),
  update: (id, body) => api.patch(`${base}/${id}/`, body).then((r) => r.data),
  remove: (id) => api.delete(`${base}/${id}/`),
});