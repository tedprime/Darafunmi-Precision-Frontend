import { apiFetch } from "../api";

export interface AuthResponse {
  token: string;
  user?: Record<string, unknown>;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await apiFetch("/user/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message || "Invalid credentials");
  }

  const data = await res.json() as AuthResponse;
  localStorage.setItem("site_token", data.token);
  return data;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
}): Promise<AuthResponse> {
  const res = await apiFetch("/user/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message || "Registration failed");
  }

  const data = await res.json() as AuthResponse;
  localStorage.setItem("site_token", data.token);
  return data;
}

export async function getMyProfile() {
  const res = await apiFetch("/user/auth/me");

  if (!res.ok) throw new Error("Could not fetch profile");

  return res.json();
}

export async function updateMyProfile(payload: {
  name?: string;
  phone?: string;
  company?: string;
}) {
  const res = await apiFetch("/user/auth/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message || "Update failed");
  }

  return res.json();
}

export function logoutUser() {
  localStorage.removeItem("site_token");
  window.location.href = "/login";
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("site_token");
}