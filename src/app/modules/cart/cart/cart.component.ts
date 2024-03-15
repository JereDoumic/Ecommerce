import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data-service.service';
import { CartService } from '../../../core/services/cart-service.service';
import { Product } from '../../../core/Models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  productList: Product[] = [];
  quantity: number = 0;
  total: number = 0;

  constructor(private dataService: DataService, private cartService: CartService){
    
  }
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe(res=>{
      if(res){
        this.productList = res;
      }
    });
    this.dataService.getQuiantity().subscribe(res=>{
      if(res){
        this.quantity = res;
      }
    })
    this.cartService.getTotal().subscribe(res=>{
      if(res){
        this.total = res;
      }
    })
  }

  addToCart(product: Product){
    this.dataService.sumQuantity();
    this.cartService.addToCart(product);
  }

  removeToCart(product: Product){
    this.dataService.removeQuantity();
    this.cartService.removeOneItemToCart(product);
  }

  removeProductToCart(product: Product){
    this.cartService.removeProductToCart(product);
    if(product.quantity! > 1){
      for(let i = 0; i < product.quantity!; i++){
        this.dataService.removeQuantity();
      }
    } else{
      this.dataService.removeQuantity();
    }
    if(this.productList.length < 1){
      this.quantity = 0;
      this.total = 0;
    }
  }

  clearCart(){
    this.quantity = 0;
    this.total = 0;
    this.cartService.clearCart();
    this.dataService.clearQuantity();
  }
}
