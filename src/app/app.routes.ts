import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { Branches } from './components/branches/branches';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SearchResults } from './components/search-results/search-results';
import { ProductDetails } from './components/product-details/product-details';
import { Products } from './components/products/products';
import { Cart } from './components/cart/cart';
import { EditProduct } from './components/edit-product/edit-product';
import { OrderList } from './components/order-list/order-list';

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
  { path: 'login',
    component: Login,
    title: 'Miniso - התחברות'
  },
  { path: 'register', 
    component: Register, 
    title: 'Miniso - הרשמה' 
  },
  { path: 'cart',
    component: Cart,
    title: 'Miniso - עגלת קניות'
  },
   {
  path: 'product/:id',
  component: ProductDetails
},
{ path: 'products', component: Products },
{
  path: 'products/:categoryId',
  component: Products
},
{
  path: 'orderList',
  component: OrderList,
  title: 'Miniso - ההזמנות שלי'
},

{ path: 'edit-product/:id', component: EditProduct },

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

