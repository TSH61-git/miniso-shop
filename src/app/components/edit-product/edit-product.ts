import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductServices } from '../../services/product-services';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct {

   id!: number;

  // אובייקט לעריכה (תתאים לשדות שלך)
  product: any = {
    productId: 0,
    productName: '',
    price: 0,
    imageUrl: '',
    description: ''
  };

  isLoading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServices
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
    this.isLoading = true;
    this.error = '';

    this.productService.getProductById(this.id).subscribe({
      next: (p: any) => {
        this.product = p;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'לא הצלחתי להביא את המוצר';
        this.isLoading = false;
      }
    });
  }

  save() {
    this.isLoading = true;
    this.error = '';

    this.productService.updateProduct(this.id, this.product).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'שמירה נכשלה';
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }


}
