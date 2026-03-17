"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cartService } from "@/lib/api/cart/cart.service";
import type { CartItem } from "@/types/cart";

type UIItem = {
  id: string;
  menu: string;
  quantity: number;
  addons: {
    id: string;
    title: string;
    price: number;
  }[];
  total: number;
};

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<UIItem[]>([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    const data = await cartService.getCart();

    const mapped: UIItem[] = data.cartItems.map((item: CartItem) => {
      const addonTotal =
        item.addons?.reduce((sum, a) => sum + a.addon.price, 0) || 0;

      const total = item.quantity * (item.menu.price + addonTotal);

      return {
        id: item.id,
        menu: item.menu.menuName,
        quantity: item.quantity,
        addons: item.addons?.map((a) => a.addon) || [],
        total,
      };
    });

    setCart(mapped);

    const totalPrice = mapped.reduce((sum, item) => sum + item.total, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCart();
    };

    fetchData();
  }, []);

  const increase = async (item: UIItem) => {
    await cartService.updateQuantity(item.id, item.quantity + 1);
    loadCart();
  };

  const decrease = async (item: UIItem) => {
    if (item.quantity <= 1) return;

    await cartService.updateQuantity(item.id, item.quantity - 1);
    loadCart();
  };

  const remove = async (id: string) => {
    await cartService.removeItem(id);
    loadCart();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ตะกร้าของฉัน</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
      )}

      {cart.map((item) => (
        <div
          key={item.id}
          className="border p-6 rounded-lg mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold text-lg">{item.menu}</h2>

            <div className="flex gap-2 mt-2 flex-wrap">
              {item.addons.map((addon) => (
                <span
                  key={addon.id}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {addon.title}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => decrease(item)}
                className="border px-3 py-1 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increase(item)}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-orange-500 font-bold text-lg">
              ฿{item.total.toFixed(2)}
            </p>

            <button
              onClick={() => remove(item.id)}
              className="text-red-500 text-sm mt-2"
            >
              ลบ
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="border-t mt-6 pt-6">
          <p className="text-lg font-semibold">รวม: ฿{total.toFixed(2)}</p>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            ชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
}
