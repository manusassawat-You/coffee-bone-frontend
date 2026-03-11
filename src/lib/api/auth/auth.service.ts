import { apiFetch } from "../client";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log("LOGIN RESPONSE:", res);

    // ดึง accessToken จาก backend
    const token = res.accessToken;

    // เก็บ token ใน localStorage
    if (token) {
      localStorage.setItem("token", token);
    }

    return res;
  },

  register: (data: { username: string; email: string; password: string }) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
