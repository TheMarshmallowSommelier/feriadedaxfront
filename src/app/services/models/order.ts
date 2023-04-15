import { Customer } from "./customer";
import { OrderItem } from "./orderItem";

export interface Order {
    id: number;
    customer: Customer;
    orderDate: Date;
    totalPrice: number;
    orderItems: OrderItem[];
  }