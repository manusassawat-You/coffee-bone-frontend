import { apiFetch } from "../client";

export const menuService = {
  getMenus: () => apiFetch("/menu"),

  getMenuById: (id: string) => apiFetch(`/menu/${id}`),

  createMenu: (data: {
    menuName: string;
    price: number;
    description?: string;
    image?: string;
  }) =>
    apiFetch("/menu", {
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
    apiFetch(`/menu/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteMenu: (id: string) =>
    apiFetch(`/menu/${id}`, {
      method: "DELETE",
    }),
};
