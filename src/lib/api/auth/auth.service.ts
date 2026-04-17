import { apiFetch } from "../client";
import {
  clearStoredToken,
  getStoredToken,
  persistToken,
} from "@/lib/auth/token-storage";

type LoginResponse = {
  accessToken: string;
  expiresIn: number;
};

type MeResponse = {
  email: string;
  role: "ADMIN" | "USER";
};

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const token = res.accessToken;

    if (token) {
      persistToken(token, res.expiresIn ?? 60 * 60 * 24);
    }

    return res;
  },

  register: (data: { username: string; email: string; password: string }) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => apiFetch<MeResponse>("/auth/me"),

  hasToken: () => Boolean(getStoredToken()),

  logout: () => {
    clearStoredToken();
  },
};
