import { apiFetch } from "../client";
import type { Cart } from "@/types/cart";

export const cartService = {
  getCart: () => apiFetch("/cart") as Promise<Cart>,

  addToCart: (data: { menuId: string; quantity: number; addons: string[] }) =>
    apiFetch("/cart", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateQuantity: (id: string, quantity: number) =>
    apiFetch(`/cart/item/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (id: string) =>
    apiFetch(`/cart/${id}`, {
      method: "DELETE",
    }),
};
