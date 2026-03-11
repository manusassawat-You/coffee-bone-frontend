export type OrderItem = {
  id: string;
  quantity: number;
  price: number;

  menu: {
    id: string;
    menuName: string;
    price: number;
  };
};

export type Order = {
  id: string;
  createdAt: string;
  pickupTime: string;

  status: string;
  method: string;

  totalPrice: number;

  orderItems: OrderItem[];
};
