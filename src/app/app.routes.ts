// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Footer } from './components/footer/footer';
import { ProductCard } from './components/product-card/product-card';

export const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'},
  { path: 'home',
    component: Footer, // בטלי את ה-comment כשייבאת את הקומפוננטה
    title: 'Miniso - דף הבית'
  },
  { path: 'categories',
    component: Footer,
    children: [
      // כאן אפשר להוסיף נתיבים מקוננים כמו בתמונה ששלחת
      // ...CATEGORY_DETAILS_ROUTES 
    ]
  },
  { path: 'branches',
    component: ProductCard
  },
  { path: 'admin',
    component: ProductCard
  }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

