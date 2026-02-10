import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // מאפשר שימוש ב-ngIf, ngFor וכו'
import { RouterModule } from '@angular/router'; // קריטי! מאפשר ל-Header להשתמש בנתיבים

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule], // מייבאים כאן את ה-RouterModule כדי ש-routerLink יעבוד
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})


export class Header {

}

