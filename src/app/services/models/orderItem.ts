import { Order } from "./order";
import { Product } from "./product";

export interface OrderItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
}