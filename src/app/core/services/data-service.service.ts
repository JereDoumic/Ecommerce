import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private quantity: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  constructor() {
      const number = parseInt(sessionStorage.getItem("quantity") || "0");
      this.quantity.next(number);
   }

  getQuiantity():Observable <number | null>{
    return this.quantity.asObservable();
  }

  sumQuantity(){
    let number = 0;
    number = parseInt(sessionStorage.getItem("quantity") || "0");
    number += 1;
    sessionStorage.setItem("quantity", number.toString());
    this.quantity.next(number);
  }

  removeQuantity(){
    let number = 0;
    number = parseInt(sessionStorage.getItem("quantity") || "0");
    number -= 1;
    sessionStorage.setItem("quantity", number.toString());
    this.quantity.next(number);
  }

  clearQuantity(){
    sessionStorage.removeItem("quantity");
    let number = 0;
    this.quantity.next(number);
  }
}
