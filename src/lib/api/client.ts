import { clearStoredToken, getStoredToken } from "@/lib/auth/token-storage";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }

  const token = getStoredToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });

  let data: unknown = {};

  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      clearStoredToken();

      const isAuthPage =
        window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/register");

      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? (data as { message?: string | string[] }).message
        : "API error";

    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data as T;
}
