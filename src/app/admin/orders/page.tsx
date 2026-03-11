"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/lib/api/order/order.service";
import { Order } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("โหลด orders ไม่สำเร็จ", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await loadOrders();
    };

    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await orderService.updateStatus(id, status);
      await loadOrders();
    } catch (error) {
      console.error("update status failed", error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      if (!confirm("ต้องการลบ Order นี้หรือไม่ ?")) return;

      await orderService.deleteOrder(id);

      await loadOrders();
    } catch (error) {
      console.error("delete order failed", error);
    }
  };

  const statusList = ["PENDING", "PREPARING", "READY", "COMPLETED"];

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Live Orders</h1>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={order.id} className="border rounded-xl p-6 bg-white shadow">
            <div className="flex justify-between mb-4">
              <div>
                <div className="font-semibold">ORD-{index + 1}</div>

                <div className="text-sm text-gray-500">{order.status}</div>
              </div>
            </div>

            {/* menu */}
            <div className="space-y-2 mb-4">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    {item.menu.menuName} × {item.quantity}
                  </div>

                  <div>฿{item.price}</div>
                </div>
              ))}
            </div>

            {/* update status */}
            <div className="flex gap-2 flex-wrap">
              {statusList.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(order.id, status)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  {status}
                </button>
              ))}

              {/* ปุ่มลบ เฉพาะ COMPLETED */}
              {order.status === "COMPLETED" && (
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
