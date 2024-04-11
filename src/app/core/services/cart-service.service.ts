import { Injectable } from '@angular/core';
import { Product } from '../Models';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartToReturn: BehaviorSubject<Product[] | null> = new BehaviorSubject<Product[] | null>(null);
  private total: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() {
    const cartStorage = sessionStorage.getItem('cart');
    const cart = cartStorage ? JSON.parse(cartStorage) : null;
    this.cartToReturn = new BehaviorSubject<Product[] | null>(cart);

    const number = parseInt(sessionStorage.getItem("total") || "0");
    this.total.next(number);
   }

  addToCart(product: Product){
    if(sessionStorage.getItem("cart") === null){
      let cart: Product[] = [];
      cart.push(product);
      this.cartToReturn.next(cart);
      sessionStorage.setItem("cart", JSON.stringify(cart));

    } else{
      let cartStorage = sessionStorage.getItem("cart") as string;
      let cart = JSON.parse(cartStorage);
      let index = -1;
      for(let i = 0; i < cart.length; i++){
        let productAux: Product = cart[i];
        if(productAux.id_product === product.id_product){
          index = i;
          break;
        }
      }
      if(index === -1){
        cart.push(product);
        this.cartToReturn.next(cart);
        sessionStorage.setItem("cart", JSON.stringify(cart));

      } else{
        cart[index].quantity++;
        this.cartToReturn.next(cart);
        sessionStorage.setItem("cart", JSON.stringify(cart));

      }
    }
    //Asign total to cart 
        let number = 0;
        number = parseInt(sessionStorage.getItem("total") || "0");
        number += product.price!;
        sessionStorage.setItem("total", number.toString());
        this.total.next(number);
  }

  getCart():Observable <Product[] | null>{
    return this.cartToReturn.asObservable();
  }

  getTotal():Observable <number | null>{
    return this.total.asObservable();
  }

  removeOneItemToCart(product: Product){
    let cartStorage = sessionStorage.getItem("cart") as string;
    let cart = JSON.parse(cartStorage);
    let index = -1;
    for(let i = 0; i < cart.length; i++){
      if(cart[i].id_product == product.id_product){
        index = i;
      }
    }
    if(index !== -1 && product.quantity! > 1){
      cart[index].quantity -= 1;
      this.cartToReturn.next(cart);
      sessionStorage.setItem("cart", JSON.stringify(cart));

      //Assign total to cart 
      let number = 0;
      number = parseInt(sessionStorage.getItem("total") || "0");
      number -= cart[index].price;
      sessionStorage.setItem("total", number.toString());
      this.total.next(number);
    }
  }

  removeProductToCart(product: Product){
    let cartStorage = sessionStorage.getItem("cart") as string;
    let cart = JSON.parse(cartStorage);
    let index = -1;
    for(let i = 0; i < cart.length; i++){
      if(cart[i].id_product === product.id_product){
        index = i;
        break;
      }
    }
    if(index !== -1){
      cart.splice(index, 1);
      this.cartToReturn.next(cart);
      sessionStorage.setItem("cart", JSON.stringify(cart));

      //Assign total to cart 
      let number = 0;
      number = parseInt(sessionStorage.getItem("total") || "0");
      number -= (product.price! * product.quantity!);
      sessionStorage.setItem("total", number.toString());
      this.total.next(number);
    }
  }

  clearCart(){
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("total");
    
    let number = 0;
    let cart: Product[] = [];

    this.total.next(number);
    this.cartToReturn.next(cart);

  }
}
