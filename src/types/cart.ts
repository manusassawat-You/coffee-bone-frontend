export type CartItem = {
  id: string;
  menu: string;
  quantity: number;
  addons: {
    id: string;
    title: string;
    price: number;
  }[];
  price: number;
  total: number;
};

export type Cart = {
  cartId: string | null;
  items: CartItem[];
  totalPrice: number;
};
