import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/Branch';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
    private apiUrl = 'https://localhost:44367/api/Branch';

  constructor(private http: HttpClient) {}

  getBranches(query?: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }
}
