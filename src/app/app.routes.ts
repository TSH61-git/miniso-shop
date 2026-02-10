import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';
import { About } from './components/about/about';

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
    component: About
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

