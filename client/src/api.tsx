const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  retries = 3
): Promise<Response> {
  const token = localStorage.getItem("site_token");

  for (let attempt = 0; attempt < retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers ?? {}),
        },
      });

      clearTimeout(timeout);

      if (res.status === 401) {
        localStorage.removeItem("site_token");
        window.location.href = "/login";
        return res;
      }

      return res;
    } catch (err) {
      clearTimeout(timeout);
      if (attempt < retries - 1) {
        await delay(500 * 2 ** attempt);
      } else {
        throw err;
      }
    }
  }

  throw new Error("Request failed after retries");
}