import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServices } from '../../services/product-services';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-details',
  imports: [],
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
        this.product = res;
      });
  }

}
