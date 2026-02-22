import { Injectable, signal, effect, computed } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { OrderCreateDTO, OrderItemDTO } from '../models/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
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

  cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.quantity || 1), 0);
  });

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
  // 1. הכנת פריטי ההזמנה לפי ה-DTO
  
  const orderItems: OrderItemDTO[] = this.cartItems().map(item => ({
    productId: item.productId,
    orderId: 0, // כפי שצוין, נשלח 0 ביצירה
    quantity: item.quantity
  }));

  const userData = localStorage.getItem('miniso_user');
  let userId = 0;

  if (userData) {
    // 2. המרה משרשרת (String) לאובייקט JavaScript
    const user = JSON.parse(userData);
    userId = user.userId; // חילוץ ה-ID (לפי התמונה זה 26)
  }

  if (userId === 0) {
    alert('שגיאה: משתמש לא מחובר');
    return;
  }

  // 3. בניית אובייקט ה-OrderCreateDTO
  const orderData: OrderCreateDTO = {
    userId: userId,
    orderSum: this.totalPrice(), // חישוב הסכום הכולל מהעגלה
    orderItems: orderItems
  };

  // 4. שליחת הבקשה לשרת
  return this.http.post<any>(this.apiUrl, orderData).subscribe({
    next: (response) => {
      console.log('Order created successfully!', response);
      this.clearCart(); // ניקוי העגלה לאחר הצלחה
      alert('ההזמנה בוצעה בהצלחה!');
    },
    error: (err) => {
      console.error('Error creating order:', err);
      alert('חלה שגיאה בביצוע ההזמנה');
    }
  });
}

 
}