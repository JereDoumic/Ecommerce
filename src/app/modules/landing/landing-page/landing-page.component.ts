import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  
  price = 0;
  category = "all";
  name = "";

  constructor(){

  }

  ngOnInit(): void {
    
  }

  setPrice(price: any){
    this.price = price;
  }

  setCategory(category: any){
    this.category = category;
  }

  setName(name: any){
    this.name = name;
  }
}
