import { api, clearAuthToken, setAuthToken, getStoredUser } from "@/lib/api";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Types ────────────────────────────────────────────────────────
export interface SiteUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string; // only returned by login/register, not /me
}

interface LoginPayload   { email: string; password: string }
interface SignupPayload  { name: string; email: string; password: string; phone?: string; company?: string }
interface UpdateProfilePayload { name?: string; phone?: string; company?: string }

// ─── API response shapes ──────────────────────────────────────────
// /user/auth/login and /user/auth/register return { success, token, data: SiteUser }
interface AuthResponse {
  success: boolean;
  token: string;
  data: SiteUser;   // ← "data", NOT "user"
}

// /user/auth/me and PATCH /user/auth/me return { success, data: SiteUser }
interface MeResponse {
  success: boolean;
  data: SiteUser;
}

// ─── Query key ───────────────────────────────────────────────────
const ME_KEY = ["auth", "me"] as const;

// ─── useAuth ─────────────────────────────────────────────────────
type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/login" } =
    options ?? {};

  const queryClient = useQueryClient();

  const meQuery = useQuery<SiteUser | null>({
    queryKey: ME_KEY,
    queryFn: async () => {
      // Read token from cookie (not localStorage)
      const token = document.cookie.match(/(?:^|; )site_token=([^;]*)/)?.[1];
      if (!token) return null;
      try {
        const { data } = await api.get<MeResponse>("/user/auth/me");
        // /me doesn't return createdAt — merge with stored user to preserve it
        const stored = getStoredUser<SiteUser>();
        return { ...stored, ...data.data } as SiteUser;
      } catch {
        clearAuthToken();
        return null;
      }
    },
    initialData: undefined,
    staleTime: 1000 * 60 * 5, // cache for 5 mins
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ── Login ──────────────────────────────────────────────────────
  const login = useCallback(async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>("/user/auth/login", payload);
    // API returns { success, token, data: SiteUser } — not "user"
    setAuthToken(data.token, data.data);
    queryClient.setQueryData(ME_KEY, data.data);
    return data.data;
  }, [queryClient]);

  // ── Signup ─────────────────────────────────────────────────────
  const signup = useCallback(async (payload: SignupPayload) => {
    const { data } = await api.post<AuthResponse>("/user/auth/register", payload);
    // Same shape as login
    setAuthToken(data.token, data.data);
    queryClient.setQueryData(ME_KEY, data.data);
    return data.data;
  }, [queryClient]);

  // ── Logout ─────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearAuthToken();
    queryClient.setQueryData(ME_KEY, null);
    if (redirectOnUnauthenticated && typeof window !== "undefined") {
      window.location.href = redirectPath;
    }
  }, [queryClient, redirectOnUnauthenticated, redirectPath]);

  // ── Update Profile ─────────────────────────────────────────────
  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    const { data } = await api.patch<MeResponse>("/user/auth/me", payload);
    queryClient.setQueryData(ME_KEY, data.data);
    return data.data;
  }, [queryClient]);

  const state = useMemo(() => ({
    user:            meQuery.data ?? null,
    loading:         meQuery.isLoading,
    error:           meQuery.error ?? null,
    isAuthenticated: Boolean(meQuery.data),
  }), [meQuery.data, meQuery.error, meQuery.isLoading]);

  return {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
    refresh: () => meQuery.refetch(),
  };
}