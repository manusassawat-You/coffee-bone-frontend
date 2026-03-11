"use client";

import { useEffect, useState } from "react";
import { menuService } from "@/lib/api/menu/menu.service";
import { Menu } from "@/types/menu";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");

  const loadMenus = async () => {
    try {
      const data = await menuService.getMenus();
      setMenus(data);
    } catch (error) {
      console.error("โหลด menu ไม่สำเร็จ", error);
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      await loadMenus();
    };

    fetchMenus();
  }, []);

  const createMenu = async () => {
    if (!menuName || !price) return;

    try {
      await menuService.createMenu({
        menuName,
        price: Number(price),
      });

      setMenuName("");
      setPrice("");

      await loadMenus();
    } catch (error) {
      console.error("create menu failed", error);
    }
  };

  const deleteMenu = async (id: string) => {
    try {
      await menuService.deleteMenu(id);
      await loadMenus();
    } catch (error) {
      console.error("delete menu failed", error);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Menu</h1>

      {/* create menu */}
      <div className="flex gap-3 mb-6">
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu name"
          className="border p-2 rounded"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 rounded"
        />

        <button
          onClick={createMenu}
          className="bg-orange-500 text-white px-4 rounded"
        >
          Create
        </button>
      </div>

      {/* menu list */}
      <div className="space-y-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              {menu.menuName} - ฿{menu.price}
            </div>

            <button
              onClick={() => deleteMenu(menu.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
