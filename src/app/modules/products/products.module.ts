import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    ListProductsComponent,
    ProductsFilterComponent,
    AddProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    ListProductsComponent,
    ProductsFilterComponent
  ]
})
export class ProductsModule { }
