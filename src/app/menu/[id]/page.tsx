"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Menu } from "@/types/menu";
import { menuService } from "@/lib/api/menu/menu.service";
import { addonService } from "@/lib/api/addon/addon.service";
import { cartService } from "@/lib/api/cart/cart.service";
import { authService } from "@/lib/api/auth/auth.service";

import toast from "react-hot-toast";

const fallbackMenuImage = "/img-coffee.png";

type Addon = {
  id: string;
  title: string;
  price: number;
  type: string;
};

export default function MenuDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [menu, setMenu] = useState<Menu | null>(null);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const menuData = await menuService.getMenuById(id as string);
        const addonData = await addonService.getAddons();

        setMenu(menuData);
        setAddons(addonData);
      } catch (err) {
        console.error(err);
        toast.error("โหลดข้อมูลไม่สำเร็จ");
      }
    };

    loadData();
  }, [id]);

  // เลือกได้ 1 addon ต่อ 1 type
  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) => {
      const filtered = prev.filter((selectedId) => {
        const existing = addons.find((a) => a.id === selectedId);
        return existing?.type !== addon.type;
      });

      return [...filtered, addon.id];
    });
  };

  const addToCart = async () => {
    if (!authService.hasToken()) {
      toast.error("Please login before adding items to your cart");
      router.push("/login");
      return;
    }

    try {
      await cartService.addToCart({
        menuId: id as string,
        quantity,
        addons: selectedAddons,
      });

      toast.success("เพิ่มลงตะกร้าแล้ว");

      setTimeout(() => {
        router.push("/cart");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("เพิ่มสินค้าไม่สำเร็จ");
    }
  };

  if (!menu) return <div className="p-10">Loading...</div>;

  const beanAddons = addons.filter((a) => a.type === "coffeeBean");
  const tempAddons = addons.filter((a) => a.type === "temperature");
  const roastAddons = addons.filter((a) => a.type === "roastLevel");
  const shotAddons = addons.filter((a) => a.type === "shot");

  return (
    <div className="p-10 max-w-4xl mx-auto">
      {/* รูปเมนู */}
      <div className="mb-6">
        <Image
          src={menu.image || fallbackMenuImage}
          alt={menu.menuName}
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </div>

      {/* ชื่อเมนู */}
      <h1 className="text-3xl font-bold">{menu.menuName}</h1>

      {/* รายละเอียด */}
      <p className="text-gray-500 mt-2">{menu.description}</p>

      {/* ราคา */}
      <p className="text-orange-500 text-xl font-bold mt-2">฿{menu.price}</p>

      {/* Coffee Bean */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">เลือกเมล็ดกาแฟ</h2>

        <div className="grid grid-cols-2 gap-3">
          {beanAddons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={`border p-3 rounded ${
                selectedAddons.includes(addon.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              {addon.title} +฿{addon.price}
            </button>
          ))}
        </div>
      </div>

      {/* Temperature */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Temperature</h2>

        <div className="flex gap-3">
          {tempAddons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={`border px-4 py-2 rounded ${
                selectedAddons.includes(addon.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              {addon.title}
            </button>
          ))}
        </div>
      </div>

      {/* Roast Level */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">ระดับการคั่ว</h2>

        <div className="flex gap-3">
          {roastAddons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={`border px-4 py-2 rounded ${
                selectedAddons.includes(addon.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              {addon.title}
            </button>
          ))}
        </div>
      </div>

      {/* Extra Shot */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Extra Shot</h2>

        <div className="flex gap-3">
          {shotAddons.map((addon) => (
            <button
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              className={`border px-4 py-2 rounded ${
                selectedAddons.includes(addon.id)
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              {addon.title} +฿{addon.price}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-8 flex gap-4 items-center">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="border px-3 py-1 rounded"
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="border px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={addToCart}
        className="mt-10 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}
