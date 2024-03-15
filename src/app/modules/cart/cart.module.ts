import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
