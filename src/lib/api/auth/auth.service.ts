import { apiFetch } from "../client";

type LoginResponse = {
  accessToken: string;
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
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/`;
    }

    return res;
  },

  register: (data: { username: string; email: string; password: string }) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => apiFetch<MeResponse>("/auth/me"),

  logout: () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
  },
};
