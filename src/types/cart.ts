export type CartItem = {
  id: string;
  quantity: number;

  menu: {
    id: string;
    menuName: string;
    price: number;
  };

  addons?: {
    addon: {
      id: string;
      title: string;
      price: number;
    };
  }[];
};

export type Cart = {
  id: string;
  cartItems: CartItem[];
};
