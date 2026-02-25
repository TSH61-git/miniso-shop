import { Component, OnInit, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/OrderDTO';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // ייבוא ה-Pipes
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, DatePipe, CurrencyPipe, FormsModule], // הוספת ה-Pipes ל-imports
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})

export class OrderList {
  private orderService = inject(OrderService);
  public authService = inject(AuthService);

  // יצירת Signal שיחזיק את רשימת ההזמנות
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // If admin, fetch all orders; otherwise fetch current user's orders
    const obs = this.authService.isAdmin ? this.orderService.getAllOrders() : this.orderService.getOrdersForCurrentUser();

    obs.subscribe({
      next: (data) => {
        this.orders.set(data); // עדכון ה-Signal
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('שגיאה בטעינת הזמנות:', err);
        this.isLoading.set(false);
      }
    });
  }
  markReceived(order: Order) {

 

const body = {

  status: null,
  received: true
};

  this.orderService.updateOrderStatus(order.orderId, body)
    .subscribe(() => {

      // עדכון מיידי במסך
      order.status = 'Received';

      // רענון signal
      this.orders.set([...this.orders()]);
    });
}
  saveStatus(order: Order, newStatus?: string) {

   const body = {
   
    status: order.status,
    received: false
  };

  this.orderService.updateOrderStatus(order.orderId, body)
    .subscribe(() => {
      this.orders.set([...this.orders()]);
    });
}
}
