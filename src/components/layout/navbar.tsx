"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-orange-600 flex items-center gap-2">
        <Link href="/">☕ Coffee Bone</Link>
      </div>

      {/* Menu */}
      <div className="flex gap-8 text-gray-600">
        <Link href="/">หน้าแรก</Link>
        <Link href="/menu">เมนูกาแฟ</Link>
        <Link href="/orders">คำสั่งซื้อ</Link>
      </div>

      {/* Right icons */}
      <div className="flex gap-4 items-center">
        <Link href="/cart">
          <ShoppingCart className="w-5 h-5" />
        </Link>

        <Link href="/profile">
          <User className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
