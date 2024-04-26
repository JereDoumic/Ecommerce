import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductComponent } from './product/product.component';
import { authGuard } from '../auth/services/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'addProducts',
    component: AddProductsComponent,
    canActivate:[authGuard]
  },
  {
    path: ':title',
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
