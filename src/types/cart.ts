import { Addon } from "./addon";

export type CartItem = {
  id: string;
  quantity: number;

  menu: {
    id: string;
    menuName: string;
    price: number;
  };

  addons?: {
    addon: Addon;
  }[];
};

export type Cart = {
  id: string;
  cartItems: CartItem[];
};
