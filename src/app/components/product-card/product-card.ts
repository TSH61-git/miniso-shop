import { Component ,Input, Inject, inject} from '@angular/core';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [JsonPipe,CommonModule ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})

export class ProductCard {

  @Input() product!: Product;
  private cartService = inject(CartService);

  constructor( public authService: AuthService,
                  private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product', this.product.productId]);
  }

  onAddToCart() {
    // שולחים את המוצר ל-Service
    this.cartService.addToCart({
      productId: this.product.productId,
      name: this.product.productName,
      price: this.product.price,
      quantity: 1
    });
    
    alert('המוצר נוסף לסל!'); 
  }

  editProduct(id: number) {
  this.router.navigate(['/edit-product', id]);
}

deleteProduct(id: number) {
  // כאן נקרא ל-productService.delete
  console.log("Deleting product", id);
}

}
