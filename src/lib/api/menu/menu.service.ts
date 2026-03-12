import { apiFetch } from "../client";
import type { Menu } from "@/types/menu";

export const menuService = {
  getMenus: () => apiFetch<Menu[]>("/menu"),

  getMenuById: (id: string) => apiFetch<Menu>(`/menu/${id}`),

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

  deleteMenu: (id: string) =>
    apiFetch<{ success: boolean }>(`/menu/${id}`, {
      method: "DELETE",
    }),
};
