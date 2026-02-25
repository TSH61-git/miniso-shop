import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServices } from '../../services/product-services';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  product!: Product;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServices,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productService.getProductById(id)
      .subscribe(res => {
        console.log("data:", res);
        this.product = res;
      });
  }

  onAddToCart() {
    // שולחים את המוצר ל-Service
    this.cartService.addToCart({
      productId: this.product.productId,
      name: this.product.productName,
      price: this.product.price,
      quantity: this.selectedQuantity
    });
    
    alert('המוצר נוסף לסל!'); 
  }

  backToProducts() {
    this.location.back();
  }

}
