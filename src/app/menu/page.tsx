"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu } from "@/types/menu";
import { menuService } from "@/lib/api/menu/menu.service";

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const data = await menuService.getMenus();
        setMenus(data);
      } catch (err) {
        console.error(err);
        setError("โหลดเมนูกาแฟไม่สำเร็จ");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenus();
  }, []);

  if (isLoading) {
    return <div className="p-10 text-gray-500">กำลังโหลดเมนูกาแฟ...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  if (menus.length === 0) {
    return (
      <div className="p-10 text-gray-500">
        ยังไม่มีเมนูกาแฟในระบบ
      </div>
    );
  }

  return (
    <div className="p-10 grid grid-cols-3 gap-6">
      {menus.map((menu) => (
        <div key={menu.id} className="bg-white rounded-xl shadow p-5">
          {/* menu image */}
          {menu.image && (
            <Image
              src={menu.image}
              alt={menu.menuName}
              width={400}
              height={300}
              className="rounded-lg object-cover mb-4 w-full h-48"
            />
          )}

          <h2 className="text-lg font-bold">{menu.menuName}</h2>

          <p className="text-gray-500 text-sm mt-1">{menu.description}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-orange-500 font-bold">฿{menu.price}</span>

            <button
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/menu/${menu.id}`)}
            >
              + สั่งเลย
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
