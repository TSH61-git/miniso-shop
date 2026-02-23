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

  getOrdersForCurrentUser(): Observable<Order[]> {
    const userData = localStorage.getItem('miniso_user');
    const userId = userData ? JSON.parse(userData).userId : null;

    if (!userId) {
      throw new Error('No user found in localStorage');
    }
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }
}
