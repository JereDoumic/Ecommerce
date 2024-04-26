import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Error404Component } from './error404/error404.component';



@NgModule({
  declarations: [
    NavBarComponent,
    Error404Component
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
