import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products-service.service';
import { Category, Product } from '../../../core/Models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit{

  private title: string = "";
  private category?: number;
  private description: string = "";
  private price?: number;
  categoriesList: Category[] = [];
  productList: Product[] = [];
  
  constructor(private fb: FormBuilder, private productService: ProductsService, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.getData();
  }

  productForm: FormGroup = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  })

  getData(){
    this.productService.getAllCategories().subscribe(res => {
      this.categoriesList = res;
    });
    
    this.productService.getAllProducts().subscribe(res => {
      this.productList = res;
    });
  }


  addProduct(){
    const PRODUCT: Product = {
      id_product: this.getLastId(),
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      id_category: Number(this.productForm.value.category),
      price: this.productForm.value.price,
      image: this.productForm.value.image
    }
   
    if(this.productForm.valid === true){
      this.productService.addProduct(PRODUCT).subscribe({
        next: res => {
          this.productForm.reset();
          this.toastr.success("El producto se ha registrado con éxito", "Producto registrado con éxito");
        },
        error: error => {
          this.toastr.error("El producto no ha podido ser registrado", "No se pudo registrar el producto");
        }
      });
    } else{
      this.toastr.error("complete todos los campos", "Error");
    }
  } 

  getLastId(){
    let id = 1;
    for(let item of this.productList){
      id++;
    }
    return id;
  }

}
