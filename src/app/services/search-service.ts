// services/search-service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { ProductService,  ProductDTO, PageResponseDTO} from './product-service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  // נחלוק את התוצאות שהגיעו מהשרת
  private searchResults = new BehaviorSubject<ProductDTO[]>([]);
  searchResults$ = this.searchResults.asObservable();

  constructor(private productService: ProductService) {}

  // // פונקציה שמבצעת את החיפוש מול השרת
  // search(term: string) {


  //   // קריאה ל-API עם הפרמטר desc (המילה שחיפשנו)
  //   // הערה: שלחתי 0, 10 כברירת מחדל למיקום ודילוג
  //   this.productService.getProducts(1, 10, term).subscribe(response => {
  //     this.searchResults.next(response.data);
  //   });
  // }

  search(term: string) {
  // 1. נרמול הטקסט - מוריד רווחים מיותרים מהקצוות
  const cleanTerm = term ? term.trim() : '';

  if (cleanTerm === '') {
    this.searchResults.next([]); // מנקה את התצוגה
    return;
  }
  // 3. קריאה לשרת
  // חשוב: לוודא שה-API שלך באמת מחזיר מערך ריק כשאין התאמה ל-term
  this.productService.getProducts(1, 10, cleanTerm).subscribe({
    next: (response) => {
      // אם השרת החזיר נתונים, נעדכן. אם אין תוצאות (data ריק), זה ינקה את המסך.
      const data = response && response.data ? response.data : [];
      this.searchResults.next(data);
      
      console.log(`חיפוש עבור "${cleanTerm}" החזיר ${data.length} תוצאות`);
    },
    error: (err) => {
      // 4. טיפול בשגיאות - אם השרת נפל, ננקה את המסך כדי שלא יישארו תוצאות ישנות
      console.error('שגיאה בחיפוש:', err);
      this.searchResults.next([]);
    }
  });
}
}