// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// הגדרת המבנים לפי ה-DTOs שלך ב-.NET
export interface ProductDTO {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  description: string;
}

export interface PageResponseDTO<T> {
  data: T[];
  totalItems: number;
  // שאר השדות מה-.NET...
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:44367/api/product';

  constructor(private http: HttpClient) {}

  // פונקציה לקבלת המוצרים
  getProducts(position: number, skip: number, desc?: string): Observable<PageResponseDTO<ProductDTO>> {
    let params = new HttpParams()
      .set('position', position.toString())
      .set('skip', skip.toString());
    
    if (desc) params = params.set('Desc', desc);

    return this.http.get<PageResponseDTO<ProductDTO>>(this.apiUrl, { params });
  }
}