import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/Models';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/services/data-service.service';
import { CartService } from '../../../core/services/cart-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  
  title: string = "";
  product?: Product;
  productToCart? : Product;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.title = params['title']});
    this.product = history.state.product;
  }
  
  constructor(private route: ActivatedRoute, private dataService: DataService, private cartService: CartService, private router: Router){
    
  }

  addToCart(){
    this.product!.quantity = 1;
    this.dataService.sumQuantity();
    this.cartService.addToCart(this.product!);
  }

  buyNow(){
    this.product!.quantity = 1;
    this.dataService.sumQuantity();
    this.cartService.addToCart(this.product!);
    this.router.navigate(["/cart"]);
  }
}
