export interface Order {
  address: string;
  orderItems: [orderItem];
  total: number;
}

interface orderItem {
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
}
