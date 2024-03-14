import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductsService } from '../services/products-service.service';
import { Category } from '../../../core/Models';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent implements OnInit{
  
  priceSince = 0;
  category = "all";
  name = "";
  categories: Category[] = [];
  @Output() priceEmitter = new EventEmitter<any>();
  @Output() categoryEmitter = new EventEmitter<any>();
  @Output() nameEmitter = new EventEmitter<any>();
  
  constructor(private _productService: ProductsService){

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._productService.getAllCategories().subscribe(res=>{
      this.categories = res;
    })
  }

  setPrice(event: any){
    this.priceSince = event.target.value;
    this.priceEmitter.emit(this.priceSince);
  }

  setCategory(event: any){
    this.category = event.target.value;
    this.categoryEmitter.emit(this.category);
  }

  setName(event: any){
    this.name = event.target.value;
    this.nameEmitter.emit(this.name);
  }
}
