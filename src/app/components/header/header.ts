import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { SearchService } from '../../services/search-service';
import { AuthService } from '../../services/auth-service'; // ודאי שהנתיב נכון
import { CartService } from '../../services/cart-service'; // ודאי שהנתיב נכון

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})


export class Header {
  public authService = inject(AuthService);
  private router = inject(Router);
  private location = inject(Location);
  public cartService = inject(CartService);

  isDropdownOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation(); // מונע מהלחיצה לסגור את התפריט מיד דרך ה-HostListener
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // סגירה בלחיצה בכל מקום אחר בדף
  @HostListener('document:click')
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/home']); // או לדף הבית
  }

onSearchChange(event: any) {
  const term = event.target.value;

  if (term.length === 0 ) {    
    // 2. חוזרים דף אחד אחורה
    this.location.back();
  } else {
    this.router.navigate(['/search'], { queryParams: { q: term } });
  }
}
}

