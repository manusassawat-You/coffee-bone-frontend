"use client";

import { useEffect, useState } from "react";

import { Menu } from "@/types/menu";
import { menuService } from "@/lib/api/menu/menu.sevice";
import Navbar from "@/components/layout/navbar";

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const loadMenus = async () => {
      const data = await menuService.getMenus();
      setMenus(data);
    };

    loadMenus();
  }, []);

  return (
    <div>
      <div className="p-10 grid grid-cols-3 gap-6">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-bold">{menu.menuName}</h2>

            <p className="text-gray-500">{menu.description}</p>

            <div className="flex justify-between mt-4">
              <span className="text-orange-500 font-bold">฿{menu.price}</span>

              <button className="bg-orange-500 text-white px-4 py-2 rounded">
                + สั่งเลย
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
