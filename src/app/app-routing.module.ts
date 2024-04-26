import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing/landing-page/landing-page.component';
import { authGuard } from './modules/auth/services/guards/auth-guard.guard';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  {
    path:'landing',
    component: LandingPageComponent,
    loadChildren:()=> import("./modules/landing/landing.module").then(m => m.LandingModule)  
  },
  {
    path: 'auth',
    loadChildren:() => import("./modules/auth/auth.module").then(m =>m.AuthModule)
   },
   {
     path: 'products',
     loadChildren:() => import("./modules/products/products.module").then(m =>m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren:() => import("./modules/cart/cart.module").then(m =>m.CartModule)
  },
   {
    path:'',
    redirectTo: 'landing',
    pathMatch:'full'
   },
   {
     path: 'categories',
     loadChildren:() => import("./modules/categories/categories.module").then(m =>m.CategoriesModule),
     canActivate: [authGuard]
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '404'
  }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
