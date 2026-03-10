import { apiFetch } from "../client";

export const menuService = {
  getMenus: () => apiFetch("/menu"),
  getMenuById: (id: string) => apiFetch(`/menu/${id}`),
};
