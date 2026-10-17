import axios from "axios";
import { clearTokens, getAccess, getRefresh, getVisitorId, setTokens } from "./tokens";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  config.headers["X-Visitor-Id"] = getVisitorId();
  const token = getAccess();
  if (token && !config.skipAuth) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response?.status !== 401 || !config || config._retried || config.skipAuth) return Promise.reject(error);

    const refresh = getRefresh();
    if (!refresh) return Promise.reject(error);       // plain visitor: nothing to refresh
    config._retried = true;

    try {
      refreshing ??= axios
        .post(`${baseURL}/auth/refresh/`, { refresh })
        .then((r) => r.data)
        .finally(() => { refreshing = null; });
      const data = await refreshing;
      setTokens(data);                                  // rotated refresh token is stored too
      config.headers.Authorization = `Bearer ${data.access}`;
      return api(config);
    } catch {
      clearTokens();
      window.dispatchEvent(new Event("auth:expired"));
      if (window.location.pathname.startsWith("/dashboard")) {
        window.location.assign("/login");
        return Promise.reject(error);
      }
      if (config.method === "get") {                    // public page with a stale token: retry anonymously
        config.skipAuth = true;
        delete config.headers.Authorization;
        return api(config);
      }
      return Promise.reject(error);
    }
  }
);

export default api;