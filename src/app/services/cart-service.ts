import { Injectable, signal, effect, computed } from '@angular/core';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:44367/api/Order';
  // סיגנל שמחזיק את רשימת המוצרים
  private cartItems = signal<CartItem[]>([]);

  constructor() {
    // 1. טעינה ראשונית של העגלה ברגע שה-Service עולה
    this.loadCart();

    // 2. אפקט ששומר אוטומטית בכל שינוי, תוך שימוש במפתח הייחודי למשתמש
    effect(() => {
      const key = this.getCartKey();
      if (key) {
        localStorage.setItem(key, JSON.stringify(this.cartItems()));
      }
    });
  }

  // יצירת מפתח ייחודי לפי המשתמש השמור ב-LocalStorage
  private getCartKey(): string {
    const username = localStorage.getItem('username'); // נניח שזה המפתח שבו שמרת את השם
    return username ? `cart_${username}` : 'cart_guest';
  }

  // טעינת העגלה המתאימה למשתמש הנוכחי
  loadCart() {
    const key = this.getCartKey();
    const savedCart = localStorage.getItem(key);
    this.cartItems.set(savedCart ? JSON.parse(savedCart) : []);
  }

  // חשיפת המוצרים לקריאה בלבד
  get items() {
    return this.cartItems.asReadonly();
  }

  // חישוב סך הכל (Total) בצורה ריאקטיבית
  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  addToCart(product: CartItem) {
    this.cartItems.update(prev => {
      const existing = prev.find(i => i.productId === product.productId);
      if (existing) {
        return prev.map(i => i.productId === product.productId 
          ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // בתוך ה-CartService

decreaseQuantity(productId: number) {
  this.cartItems.update(prevItems => {
    return prevItems.map(item => {
      if (item.productId === productId) {
        // מוריד כמות רק אם היא גדולה מ-1
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  });
}

// פונקציה אופציונלית למחיקה מוחלטת של שורה
removeItem(productId: number) {
  this.cartItems.update(prevItems => 
    prevItems.filter(item => item.productId !== productId)
  );
}

  // ניקוי העגלה (למשל אחרי ביצוע הזמנה או Logout)
  clearCart() {
    this.cartItems.set([]);
  }

  createOrder() {
    const order = {
      user: localStorage.getItem('username'),
      items: this.items(),
      total: this.totalPrice(),
      date: new Date()
    };
    // שליחה ל-Back-end...
 }

 
}