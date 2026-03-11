"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/lib/api/order/order.service";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error("โหลดคำสั่งซื้อไม่สำเร็จ", error);
      }
    };

    loadOrders();
  }, []);

  // แปลง status เป็นภาษาไทย
  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "รอดำเนินการ";
      case "PREPARING":
        return "กำลังทำ";
      case "READY":
        return "พร้อมรับ";
      case "COMPLETED":
        return "สำเร็จ";
      default:
        return status;
    }
  };

  // สีของ badge status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-400";
      case "PREPARING":
        return "bg-blue-400";
      case "READY":
        return "bg-green-500";
      case "COMPLETED":
        return "bg-gray-400";
      default:
        return "bg-gray-300";
    }
  };

  // ลำดับ progress
  const statusSteps = ["PENDING", "PREPARING", "READY", "COMPLETED"];

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">คำสั่งซื้อของฉัน</h1>

      <div className="space-y-6">
        {orders.map((order, index) => {
          const currentStep = statusSteps.indexOf(order.status);

          return (
            <div
              key={order.id}
              className="border rounded-xl p-6 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-semibold text-lg">ORD-{index + 1}</div>

                  <div className="text-sm text-gray-500">
                    สั่งเมื่อ {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <div
                  className={`${getStatusColor(
                    order.status,
                  )} text-white px-3 py-1 rounded-full text-sm`}
                >
                  {getStatusText(order.status)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6">
                {statusSteps.map((step, i) => (
                  <div key={step} className="flex-1 flex items-center">
                    {/* dot */}
                    <div
                      className={`w-6 h-6 rounded-full ${
                        i <= currentStep ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />

                    {/* line */}
                    {i < statusSteps.length - 1 && (
                      <div
                        className={`flex-1 h-1 ${
                          i < currentStep ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Menu */}
              <div className="space-y-2 mb-4">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">{item.menu.menuName}</div>

                      <div className="text-sm text-gray-500">
                        x {item.quantity}
                      </div>
                    </div>

                    <div className="text-orange-500 font-semibold">
                      ฿{item.price}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <div className="text-gray-500">เวลารับ</div>

                  <div className="font-medium">
                    {new Date(order.pickupTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-gray-500">วิธีชำระเงิน</div>

                  <div className="font-medium">{order.method}</div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <div className="font-semibold">ราคาทั้งหมด</div>

                <div className="text-orange-500 text-xl font-bold">
                  ฿{order.totalPrice}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
