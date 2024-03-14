import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products/services/products-service.service';
import { Category } from '../../../core/Models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit{

  categories: Category[] = [];
  
  ngOnInit(): void {
    this.getData();
  }

  constructor(private fb: FormBuilder, private productService: ProductsService, private toastr: ToastrService){

  }

  categoryForm: FormGroup = this.fb.group({
    category: new FormControl('', [Validators.required])
  })

  getData(){
    this.productService.getAllCategories().subscribe(res=>{
      this.categories = res;
    })
  }

  addCategory(){
    const CATEGORY: Category = {
      id: this.getLastId(),
      category: this.categoryForm.value.category
    }
    this.productService.addCategory(CATEGORY).subscribe(res=>{
      this.toastr.success("La categoria ha sido agregada con éxito", "Categoria agregada con éxito");
    })
  }

  getLastId(){
    let id = 1;
    for(let item of this.categories){
      id++
    }
    return id;
  }

}
