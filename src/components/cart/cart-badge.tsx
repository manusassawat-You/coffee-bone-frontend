"use client";

import { useEffect, useState } from "react";
import { cartService } from "@/lib/api/cart/cart.service";
import { useAuth } from "@/context/auth-context";

export default function CartBadge() {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      try {
        const cart = await cartService.getCart();

        const items = cart?.items || [];
        setCount(items.length);
      } catch {
        setCount(0);
      }
    };

    load();
  }, [user]);

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
      {count}
    </span>
  );
}
