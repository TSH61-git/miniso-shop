import { Component, OnInit, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/OrderDTO';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // ייבוא ה-Pipes
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, DatePipe, CurrencyPipe], // הוספת ה-Pipes ל-imports
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})

export class OrderList {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

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
}
