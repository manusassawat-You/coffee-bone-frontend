"use client";

import { useEffect, useState } from "react";
import { cartService } from "@/lib/api/cart/cart.service";
import { CartItem } from "@/types/cart";

export default function CartBadge() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      const data = await cartService.getCart();

      const total = data.items.reduce(
        (sum: number, item: CartItem) => sum + item.quantity,
        0,
      );

      setCount(total);
    };

    load();
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
      {count}
    </span>
  );
}
