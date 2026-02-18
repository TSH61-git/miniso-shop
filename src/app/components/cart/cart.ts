import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  public cartService = inject(CartService);

  // פונקציות עזר לשינוי כמויות ישירות מהעגלה
  increment(productId: number) {
    const item = this.cartService.items().find(i => i.productId == productId);
    if (item) this.cartService.addToCart(item);
  }

  decrement(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  // פונקציה למחיקה
  removeItem(productId: number) {
    if(confirm('האם להסיר את המוצר מהסל?')) {
      this.cartService.removeItem(productId);
    }
}

  // (אופציונלי) פונקציה להסרה או הפחתה ב-Service
  checkout() {
    this.cartService.createOrder();
    // ניקוי העגלה
    this.cartService.clearCart();
    
    // הודעה למשתמש
    alert('ההזמנה בוצעה בהצלחה');
    
    // מעבר לדף הבית או לדף "תודה רבה"
    // this.router.navigate(['/']);
  }
}