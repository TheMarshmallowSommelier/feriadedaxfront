import { Customer } from './customer';

export interface Order {
  id: number;
  orderDate: string;
  totalPrice: number;
  customer: Customer;
  orderItems: OrderItem[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Product {
  id: number;
}
