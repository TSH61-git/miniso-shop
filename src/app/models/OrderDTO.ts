export interface OrderItemDTO {
  productId: number;
  orderId: number; // בדרך כלל נשלח 0 ביצירה
  quantity: number;
}

export interface OrderCreateDTO {
  userId: number;
  orderSum: number;
  orderItems: OrderItemDTO[];
}