"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import CartBadge from "@/components/cart/cart-badge";
import { useAuth } from "@/context/auth-context";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-orange-600">
        <Link href="/">☕Coffee Bone</Link>
      </div>

      <div className="flex gap-8 text-gray-600">
        <Link href="/">หน้าแรก</Link>
        <Link href="/menu">เมนูกาแฟ</Link>
        <Link href="/orders" prefetch={false}>
          คำสั่งซื้อ
        </Link>

        {user?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <Link href="/cart" prefetch={false}>
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <CartBadge />
        </div>

        {user ? (
          <div className="flex gap-3 items-center">
            <Link href="/profile" prefetch={false}>
              {user.email}
            </Link>

            <button onClick={logout} className="text-red-500 text-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            <User className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
