import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductsService } from '../services/products-service.service';
import { Category, Product } from '../../../core/Models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit, OnChanges{
  
  productList: any[] = [];
  originalArray: any[] = [];
  searching = false;
  modalSwitch = false;
  product?: Product;
  categoriesList: Category[] = [];
  userToken!: number;
  
  @Input() priceSince = 0;
  @Input() category = "all";
  @Input() name = "";

  constructor(private _productService: ProductsService, private fb: FormBuilder, private toastr: ToastrService, private router: Router){

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._productService.getAllProducts().subscribe(res =>{
      this.productList = res;
      this.originalArray = this.productList;
      this.productList.sort((a, b) => a.price - b.price);
    });
    this._productService.getAllCategories().subscribe(res => {
      this.categoriesList = res;
    });
   
    this.userToken = Number(localStorage.getItem("token"));
  }

  ngOnChanges(changes: SimpleChanges){
    this.productList = this.originalArray;
    let newArray = this.productList.filter(product => product.price > this.priceSince
      && (product.id_category === Number(this.category) || this.category === "all")
      && (product.title.toLowerCase().includes(this.name)));
    newArray.sort((a, b) => a.price - b.price);
    this.productList = newArray;
    this.searching = true;
  }

  productForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  modify(product: Product){
    this.product = product;
    this.productForm.patchValue({
      title: product.title,
      description: product.description,
      category: product.id_category,
      price: product.price,
      image: product.image
    })
  }

  modifyProduct(){
    const PRODUCT: Product = {
      id_product: this.product?.id_product || null,
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      id_category: Number(this.productForm.value.category),
      price: this.productForm.value.price,
      image: this.product?.image || null,
      quantity: 1
    }
    
    this._productService.updateProduct(PRODUCT).subscribe({
      next: res=> {
      this.productForm.reset();
      location.reload();
      this.toastr.success("El producto se ha actualizado con éxito", "Producto actualizado con éxito");
    }, error: error=> {
      this.toastr.error("El producto no ha podido ser actualizado", "No se pudo actulizar el producto");
    }});
  }

  deleteProduct(){
    this._productService.deleteProduct(this.product!).subscribe({
      next: res=>{
      location.reload();
      this.toastr.success("El producto se ha eliminado con éxito", "Producto eliminado con éxito");
    }, error: error=> {
      this.toastr.error("El producto no ha podido ser eliminado", "No se pudo eliminar el producto");
    }});
  }

  deleteModal(product: Product){
    this.product = product;
  }

  goProduct(product: Product){
    this.router.navigate([`products/${product.title}`], {
      state: {product}
    });
  }

  

}
