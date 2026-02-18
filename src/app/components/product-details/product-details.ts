import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServices } from '../../services/product-services';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServices
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productService.getProductById(id)
      .subscribe(res => {
        console.log("data:", res);
        this.product = res;
      });
  }

}
