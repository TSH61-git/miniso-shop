import { Component } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  categories: Category[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'שגיאה בטעינת הנתונים מהשרת';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
