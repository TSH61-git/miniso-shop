import { Component, OnInit, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/OrderDTO';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // ייבוא ה-Pipes

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, DatePipe, CurrencyPipe], // הוספת ה-Pipes ל-imports
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})

export class OrderList {
  private orderService = inject(OrderService);

  // יצירת Signal שיחזיק את רשימת ההזמנות
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrdersForCurrentUser().subscribe({
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
