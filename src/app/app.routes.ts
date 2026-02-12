import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { Branches } from './components/branches/branches';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchResults } from './components/search-results/search-results';

export const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home',
    component: Home,
    title: 'Miniso - דף הבית'
  },
  { path: 'categories',
    component: ProductCard,
  },
  { path: 'branches',
    component: Branches
  },
  { path: 'about',
    component: About
  },
  { path: 'search',
    component: SearchResults,
    title: 'Miniso - חיפוש' 
  },
  { path: 'management',
    component: ProductCard
  }, 
  { path: 'profile',
    component: Login,
    title: 'Miniso - התחברות'
  },
  { path: 'register', 
    component: Register, 
    title: 'Miniso - הרשמה' 
  },
  { path: 'cart',
    component: SearchResults
  },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

