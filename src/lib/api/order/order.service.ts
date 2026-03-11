import { apiFetch } from "../client";

export const orderService = {
  checkout: (data: { pickupTime: string; paymentMethod: string }) =>
    apiFetch("/order/checkout", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getOrders: () => apiFetch("/order"),

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
