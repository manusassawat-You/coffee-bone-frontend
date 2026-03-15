import { apiFetch } from "../client";
import type { Menu } from "@/types/menu";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const menuService = {
  // =========================
  // GET MENUS
  // =========================
  getMenus: () => apiFetch<Menu[]>("/menu"),

  getMenuById: (id: string) => apiFetch<Menu>(`/menu/${id}`),

  // =========================
  // UPLOAD IMAGE (Cloudinary)
  // =========================
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/upload/image`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload image failed: ${text}`);
    }

    return res.json();
  },

  // =========================
  // CREATE MENU
  // =========================
  createMenu: (data: {
    menuName: string;
    price: number;
    description?: string;
    image?: string;
  }) =>
    apiFetch<Menu>("/menu", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // =========================
  // UPDATE MENU
  // =========================
  updateMenu: (
    id: string,
    data: {
      menuName?: string;
      price?: number;
      description?: string;
      image?: string;
    },
  ) =>
    apiFetch<Menu>(`/menu/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // =========================
  // DELETE MENU
  // =========================
  deleteMenu: (id: string) =>
    apiFetch<{ success: boolean }>(`/menu/${id}`, {
      method: "DELETE",
    }),
};
