import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/Models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  
  title: string = "";
  product?: Product;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title']});
    this.product = history.state.product;
    console.log(history.state.product);
  }
  
  constructor(private route: ActivatedRoute){
    
  }

  addToCart(){
    
  }
}
