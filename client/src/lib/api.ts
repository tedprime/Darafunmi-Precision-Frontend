import axios from "axios";

// ─── Axios instance ───────────────────────────────────────────────
// In development, Vite proxies /api → http://localhost:5000
// In production, set VITE_API_URL to the deployed backend origin.
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : "/api/v1";

export const api = axios.create({
  baseURL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Auth token injection ─────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("site_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Response normaliser ──────────────────────────────────────────
// Unwrap the { success, data } envelope so callers get data directly
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error.response?.data?.message || error.message || "Something went wrong";

    // Auto-clear token on 401
    if (error.response?.status === 401) {
      localStorage.removeItem("site_token");
      localStorage.removeItem("site_user");
    }

    return Promise.reject(new Error(msg));
  }
);

// ─── Convenience helpers ──────────────────────────────────────────
export const setAuthToken = (token: string, user: unknown) => {
  localStorage.setItem("site_token", token);
  localStorage.setItem("site_user", JSON.stringify(user));
};

export const clearAuthToken = () => {
  localStorage.removeItem("site_token");
  localStorage.removeItem("site_user");
};

export const getStoredUser = <T = unknown>(): T | null => {
  try {
    const raw = localStorage.getItem("site_user");
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};
