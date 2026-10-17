const ACCESS = "access_token";
const REFRESH = "refresh_token";

export const getAccess = () => localStorage.getItem(ACCESS);
export const getRefresh = () => localStorage.getItem(REFRESH);
export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(ACCESS, access);
  if (refresh) localStorage.setItem(REFRESH, refresh);
}
export function clearTokens() {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
}
export function getVisitorId() {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
}