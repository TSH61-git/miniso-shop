import { Component } from '@angular/core';
import { SearchService } from '../../services/search-service'; // ודאי שהנתיב נכון
import { ProductCard, ProductDTO } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.html',
  imports: [CommonModule, ProductCard],
  styleUrls: ['./search-results.scss']
})
export class SearchResults{
  
  products: ProductDTO[] = [];

  // כאן מתבצע ה-Injection
  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    const term = params['q'] || ''; // מחלץ את המילה שנשלחה ב-URL
    
    if (term) {
      this.searchService.search(term);
    }
    });

    this.searchService.searchResults$.subscribe({
      next: (data) => {
        if (data.length === 0)
          console.log('לא נמצאו תוצאות');
        this.products = data;
        console.log('Results updated:', this.products);
      },
      error: (err) => console.error('Search error:', err)
    });
  }
}