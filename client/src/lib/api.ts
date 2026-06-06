import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : "/api/v1";

export const api = axios.create({
  baseURL,
  timeout: 30_000,
  // withCredentials: true, // sends cookies cross-origin
  headers: { "Content-Type": "application/json" },
});

// ─── Cookie helpers ───────────────────────────────────────────────
const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

// ─── Auth token injection ─────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = getCookie("site_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Response normaliser ──────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      deleteCookie("site_token");
      deleteCookie("site_user");
    }

    return Promise.reject(new Error(msg));
  }
);

// ─── Convenience helpers ──────────────────────────────────────────
export const setAuthToken = (token: string, user: unknown) => {
  setCookie("site_token", token);
  setCookie("site_user", JSON.stringify(user));
};

export const clearAuthToken = () => {
  deleteCookie("site_token");
  deleteCookie("site_user");
};

export const getStoredUser = <T = unknown>(): T | null => {
  try {
    const raw = getCookie("site_user");
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};