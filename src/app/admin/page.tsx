"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { orderService } from "@/lib/api/order/order.service";
import { Order } from "@/types/order";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const data = await orderService.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await loadOrders();
    };

    fetchOrders();
  }, []);

  const totalOrders = orders.length;

  const todayOrders = orders.filter((o) => {
    const today = new Date().toDateString();
    const orderDate = new Date(o.createdAt).toDateString();
    return today === orderDate;
  }).length;

  const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  const activeOrders = orders.filter((o) => o.status !== "COMPLETED").length;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="border p-6 rounded-xl bg-white shadow">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="border p-6 rounded-xl bg-white shadow">
          <p className="text-gray-500">Today Orders</p>
          <p className="text-2xl font-bold mt-2">{todayOrders}</p>
        </div>

        <div className="border p-6 rounded-xl bg-white shadow">
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold mt-2">฿{revenue}</p>
        </div>

        <div className="border p-6 rounded-xl bg-white shadow">
          <p className="text-gray-500">Active Orders</p>
          <p className="text-2xl font-bold mt-2">{activeOrders}</p>
        </div>
      </div>

      {/* Admin Menu */}
      <h2 className="text-xl font-semibold mb-6">Admin Tools</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => router.push("/admin/orders")}
          className="border rounded-xl p-8 bg-white shadow hover:bg-gray-50 text-left"
        >
          <h3 className="text-lg font-semibold">Manage Orders</h3>
          <p className="text-gray-500 mt-2">ดูและอัปเดตสถานะออเดอร์</p>
        </button>

        <button
          onClick={() => router.push("/admin/menu")}
          className="border rounded-xl p-8 bg-white shadow hover:bg-gray-50 text-left"
        >
          <h3 className="text-lg font-semibold">Manage Menu</h3>
          <p className="text-gray-500 mt-2">เพิ่ม ลบ และแก้ไขเมนูกาแฟ</p>
        </button>
      </div>
    </div>
  );
}
