import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/services/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    id: 0,
    orderDate: '',
    totalPrice: 0,
    customer: {
      id: 0,
      firstName: '',
      lastName: '',
      email: ''
    },
    orderItems: []
  };
  selectedOrder: Order | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrderList().subscribe(orders => {
      this.orders = orders;
    });
  }

  createOrder(): void {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      this.orders.push(order);
      this.newOrder = {
        id: 0,
        orderDate: '',
        totalPrice: 0,
        customer: {
          id: 0,
          firstName: '',
          lastName: '',
          email: ''
        },
        orderItems: []
      };
    });
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
  }

  updateOrder(): void {
    if (this.selectedOrder && this.selectedOrder.id !== undefined) {
      const { id, ...updateData } = this.selectedOrder;
      this.orderService.updateOrder(id, updateData).subscribe(() => {
        this.selectedOrder = null;
      });
    }
  }
  

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(order => order.id !== id);
      });
    }
  }
}
