import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserRead } from '../models/user-read';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44367/api/User'; 
  
  private currentUserSubject = new BehaviorSubject<UserRead | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('miniso_user');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // הרשמה (Register)
  register(user: any): Observable<UserRead> {
    return this.http.post<UserRead>(`${this.apiUrl}/register`, user).pipe(
      tap(data => this.handleAuthentication(data))
    );
  }

  // התחברות (Login)
  login(credentials: any): Observable<UserRead> {
    return this.http.post<UserRead >(`${this.apiUrl}/login`, credentials).pipe(
      tap(data => this.handleAuthentication(data))
    );
  }

  // לוגיקה משותפת לשמירה ב-LocalStorage ועדכון האתר
  private handleAuthentication(data: UserRead) {
    localStorage.setItem('miniso_user', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  // התנתקות (Logout)
  logout() {
    localStorage.removeItem('miniso_user');
    this.currentUserSubject.next(null);
  }

  // עזרים לבדיקת תפקידים (Roles)
  get isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}