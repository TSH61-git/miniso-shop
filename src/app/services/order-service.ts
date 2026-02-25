import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/OrderDTO';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:44367/api/Order';

  updateOrderStatus(orderId: number, body: any) {
  return this.http.put(`${this.apiUrl}/${orderId}`, body);
}

  getOrdersForCurrentUser(): Observable<Order[]> {
    const userData = localStorage.getItem('miniso_user');
    const userId = userData ? JSON.parse(userData).userId : null;

    if (!userId) {
      throw new Error('No user found in localStorage');
    }
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Admin: get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }
}
