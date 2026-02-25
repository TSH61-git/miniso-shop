import { ActivatedRoute } from '@angular/router';
import { Component ,OnInit} from '@angular/core';
import { ProductServices, ProductSearchParams } from '../../services/product-services';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/Category';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule,ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  products: Product[] = [];
    categoryId = 0;
    categories: Category[] = [];


  // paging
  position = 1;
  skip = 10;

  // ui state
  isLoading = false;
  errorMessage = '';

  // filters (קשור לטופס)
  desc = '';
  minPrice?: number;
  maxPrice?: number;

  constructor(private route: ActivatedRoute,
    private productService: ProductServices,
    private categoryService: CategoryService,
  public authService: AuthService,
  private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('categoryId');

  if (id) {
    this.categoryId = Number(id);
  }
    this.loadCategories();
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const filters: ProductSearchParams = {
      desc: this.desc,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      categoryIDs: this.categoryId && this.categoryId !== 0 ? [this.categoryId] : [],
      orderBy: 'price'
    };

    this.productService.getProducts(this.position, this.skip, filters).subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'שגיאה בטעינת מוצרים';
        this.isLoading = false
        console.error(err);
      },
    });
  }

  applyFilters(): void {
    this.position = 1; // תמיד חוזרים לעמוד 1 אחרי סינון
    this.load();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('שגיאה בטעינת קטגוריות', err);
      }
    });
  }

  goToAddProduct() {
  this.router.navigate(['/add-product']);
}

  

}
