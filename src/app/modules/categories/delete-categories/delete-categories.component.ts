import { Component, OnInit } from '@angular/core';
import { Category } from '../../../core/Models';
import { ProductsService } from '../../products/services/products-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrl: './delete-categories.component.css'
})
export class DeleteCategoriesComponent implements OnInit{
  
  categoriesListOriginal: Category[] = [];
  categoriesList: Category[] = [];
  category?: Category;
  filter: string = "";

  constructor(private productService: ProductsService, private toastr: ToastrService, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.productService.getAllCategories().subscribe(res=>{
      this.categoriesList = res;
      this.categoriesListOriginal = this.categoriesList;
      this.categoriesList.sort((a, b) => (a?.category || "").localeCompare(b?.category || ""));
    })
  }

  categoryForm: FormGroup = this.fb.group({
    category: new FormControl('', [Validators.required]),
  })

  filterCategorys(){
    this.categoriesList = this.categoriesListOriginal;
    let newArray = this.categoriesList.filter( category => 
      this.removeAccents(category.category!.toLowerCase()).includes(this.removeAccents(this.filter.toLowerCase())));
    newArray.sort((a, b) => (a?.category || "").localeCompare(b?.category || ""));
    this.categoriesList = newArray;
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  updateModal(category: Category){
    this.category = category;
    this.categoryForm.patchValue({
      category: category.category
    })
  }

  deleteModal(category: Category){
    this.category = category;
  }

  deleteCategory(){
    this.productService.deleteCategory(this.category!).subscribe({
      next: res=>{
      location.reload();
      this.toastr.success("La categoria se ha eliminado con éxito", "Categoria eliminada con éxito");
    }, error: error=> {
      this.toastr.error("La categoria no ha podido ser eliminada", "No se pudo eliminar la categoria");
    }});
  }

  updateCategory(){
    const CATEGORY: Category = {
      category: this.categoryForm.value.category,
      id_category: this.category?.id_category || null
    }
    this.productService.updateCategory(CATEGORY).subscribe({
      next: res=>{
      location.reload();
      this.toastr.success("La categoria ha sido actualizado con éxito", "Categoria actualizada con éxito");
    }, error: error=> {
      this.toastr.error("La categoria no ha podido ser actualizada", "No se pudo actualziar la categoria");
    }});
  }
}
