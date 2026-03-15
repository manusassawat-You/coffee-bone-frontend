import { apiFetch } from "../client";
import { Order } from "@/types/order";

export const orderService = {
  checkout: (data: { pickupTime: string; paymentMethod: string }) =>
    apiFetch("/order/checkout", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getOrders: async (): Promise<Order[]> => {
    return apiFetch("/order");
  },

  updateStatus: async (id: string, status: string) => {
    return apiFetch(`/order/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({
        status: status,
      }),
    });
  },

  deleteOrder: async (id: string) => {
    return apiFetch(`/order/${id}`, {
      method: "DELETE",
    });
  },
};
