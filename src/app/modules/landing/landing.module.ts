import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    ProductsModule
  ]
})
export class LandingModule { }
