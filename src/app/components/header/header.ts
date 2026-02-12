import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { SearchService } from '../../services/search-service';
import { Location } from '@angular/common'; // ייבוא השירות

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})


export class Header {
  constructor(private searchService: SearchService, private router: Router, private location: Location) {}


// components/header/header.component.ts
onSearchChange(event: any) {
  const term = event.target.value;

  if (term.length === 0 ) {    
    // 2. חוזרים דף אחד אחורה
    this.location.back();
  } else {
    //this.searchService.search(term);
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }
}
}

