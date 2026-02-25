import { Injectable, signal, effect, computed } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { OrderCreateDTO, OrderItemDTO } from '../models/OrderDTO';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'https://localhost:44367/api/Order';
  // סיגנל שמחזיק את רשימת המוצרים
  private cartItems = signal<CartItem[]>([]);

constructor() {
    effect(() => {
    const user = this.authService.currentUser();
    
    if (!user) {
      // ברגע שיש Logout:
      // 1. ננקה את הסיגנל של העגלה בזיכרון
      this.cartItems.set([]); 
      // 2. נטען את עגלת האורח (שהיא כנראה ריקה כי מחקנו אותה ב-Login)
      this.loadCart();
    } else {
      // ברגע שיש Login:
      // הפונקציה הזו כבר תבצע את האיחוד ותנקה את עגלת האורח
      this.loadCart();
    }
  }, { allowSignalWrites: true });

    // אפקט ששומר את העגלה בלוקל סטורג' בכל שינוי בפריטים
    effect(() => {
      const key = this.getCartKey();
      localStorage.setItem(key, JSON.stringify(this.cartItems()));
    });
  }

  cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.quantity || 1), 0);
  });

  // יצירת מפתח ייחודי לפי המשתמש השמור ב-LocalStorage
  private getCartKey(): string {
    const userData = localStorage.getItem('miniso_user');
    if (userData) {
      const user = JSON.parse(userData);
      return `cart_user_${user.userId}`; // שימוש ב-ID הייחודי
    }
    return 'cart_guest'; // עגלה למשתמש לא מחובר
  }

  // טעינת העגלה המתאימה למשתמש הנוכחי
  loadCart() {
    const guestKey = 'cart_guest';
    const guestData = localStorage.getItem(guestKey);
    const guestItems: CartItem[] = guestData ? JSON.parse(guestData) : [];

    const userKey = this.getCartKey();
    
    // אם המשתמש מחובר (המפתח הוא לא של אורח)
    if (userKey !== guestKey) {
      const userData = localStorage.getItem(userKey);
      const userItems: CartItem[] = userData ? JSON.parse(userData) : [];

      // איחוד: לוקחים את עגלת המשתמש ומוסיפים לה את פריטי האורח
      const mergedCart = this.mergeCarts(userItems, guestItems);
      
      this.cartItems.set(mergedCart);

      // אחרי האיחוד - מנקים את עגלת האורח מהלוקל סטורג'
      localStorage.removeItem(guestKey);
    } else {
      // אם זה עדיין אורח, פשוט טוענים כרגיל
      this.cartItems.set(guestItems);
    }
  }

  private mergeCarts(userItems: CartItem[], guestItems: CartItem[]): CartItem[] {
    const newCart = [...userItems];

    guestItems.forEach(guestItem => {
      const existing = newCart.find(i => i.productId === guestItem.productId);
      if (existing) {
        // אם המוצר קיים בשניהם, נחבר את הכמויות
        existing.quantity += guestItem.quantity;
      } else {
        // אם הוא חדש, נוסיף אותו לעגלת המשתמש
        newCart.push(guestItem);
      }
    });

    return newCart;
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
          ? { ...i, quantity: i.quantity + product.quantity } : i);
      }
      return [...prev, product];
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