export interface OrderItemDTO {
  productId: number;
  orderId: number;
  quantity: number;
}

export interface OrderCreateDTO {
  userId: number;
  orderSum: number;
  orderItems: OrderItemDTO[];
}


export interface Order {
  orderId: number;
  orderDate: string;
  orderSum: number;
  userId: number;
  status: string;
  orderItems: OrderItemDTO[];
}