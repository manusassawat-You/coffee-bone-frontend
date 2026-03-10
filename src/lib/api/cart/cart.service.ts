import { apiFetch } from "../client";

export const cartService = {
  addToCart: (data: { menuId: string; quantity: number; addons: string[] }) =>
    apiFetch("/cart", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
