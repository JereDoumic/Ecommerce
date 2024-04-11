import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoriesComponent } from './delete-categories/delete-categories.component';


@NgModule({
  declarations: [
    AddCategoriesComponent,
    DeleteCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoriesModule { }
