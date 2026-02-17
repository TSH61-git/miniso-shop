import { Component ,Input} from '@angular/core';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [JsonPipe ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input() product!: Product;

    constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product', this.product.productId]);
  }


}
