import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { PagedResult } from '../models/paged-result';


export interface ProductSearchParams {
  desc?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryIDs?: number[];
  orderBy?: string;
}

@Injectable({
  providedIn: 'root',
})


export class ProductServices {

    private apiUrl = 'https://localhost:44367/api/Product';

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

getProducts(
    position: number,
    skip: number,
    filters: ProductSearchParams
  ): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('position', position)
      .set('skip', skip);

    if (filters.desc) params = params.set('Desc', filters.desc);
    if (filters.minPrice != null) params = params.set('MinPrice', filters.minPrice);
    if (filters.maxPrice != null) params = params.set('MaxPrice', filters.maxPrice);
    if (filters.orderBy) params = params.set('OrderBy', filters.orderBy);

    // CategoryIDs זה array -> מוסיפים אותו בצורה של כמה פרמטרים
    if (filters.categoryIDs?.length) {
      filters.categoryIDs.forEach(id => {
        params = params.append('CategoryIDs', id);
      });
    }

    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }
}


  

