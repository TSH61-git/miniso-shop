// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';

export const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'},
  { path: 'home',
    component: ProductCard,
    title: 'Miniso - דף הבית'
  },
  { path: 'categories',
    component: ProductCard,
  },
  { path: 'branches',
    component: ProductCard
  },
  { path: 'about',
    component: ProductCard
  },
  { path: 'management',
    component: ProductCard
  }, 
  { path: 'profile',
    component: ProductCard
  },
  { path: 'cart',
    component: ProductCard
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

