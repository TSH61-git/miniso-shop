import { Component } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {

   product = {
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
     imageUrl: ''
  };

  constructor(private productService: ProductServices,
              private router: Router) {}

  addProduct() {
    console.log("addProduct עובד");
    this.productService.addProduct(this.product)
      .subscribe({
        next: () => {
          alert("המוצר נוסף בהצלחה");
          this.router.navigate(['/products']);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  goBack() {
  this.router.navigate(['/products']);
}

}
