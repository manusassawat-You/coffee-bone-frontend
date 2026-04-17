const TOKEN_KEY = "token";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(prefix.length));
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return localStorage.getItem(TOKEN_KEY) ?? readCookie(TOKEN_KEY);
  } catch {
    return readCookie(TOKEN_KEY);
  }
}

export function persistToken(token: string, maxAge: number): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax${secure}`;
}
