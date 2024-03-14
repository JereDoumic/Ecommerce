import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing/landing-page/landing-page.component';

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
    path:'',
    redirectTo: 'landing',
    pathMatch:'full'
   },
   {
     path: 'categories',
     loadChildren:() => import("./modules/categories/categories.module").then(m =>m.CategoriesModule)
  }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
