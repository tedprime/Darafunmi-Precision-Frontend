/**
 * Shared types used across the frontend.
 * Do NOT import server-side or DB types here.
 */

export * from "./_core/errors";

// ─── API response envelope ────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
