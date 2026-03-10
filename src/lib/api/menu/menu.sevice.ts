import { apiFetch } from "../client";

export const menuService = {
  getMenus: () => apiFetch("/menu"),
};
