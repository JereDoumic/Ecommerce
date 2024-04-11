import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../../../core/Models';

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  //private baseURL = "http://localhost:3000";
  private baseURL = "http://localhost:1234";
  //private api = "https://fakestoreapi.com/products";

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/products`);
  }

  
  public addProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(`${this.baseURL}/products`, product);
  }
  
  
  public updateProduct(product: Product): Observable<Product>{
    return this.httpClient.patch<Product>(`${this.baseURL}/products/${product.id_product}`, product);
  }
  
  public deleteProduct(product: Product): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.baseURL}/products/${product.id_product}`);
  }
  
  public addCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.baseURL}/categories`, category);
  }
  
  public deleteCategory(category: Category): Observable<Category>{
    return this.httpClient.delete<Category>(`${this.baseURL}/categories/${category.id_category}`);
  }

  public updateCategory(category: Category): Observable<Category>{
    return this.httpClient.patch<Category>(`${this.baseURL}/categories/${category.id_category}`, category);
  }
  
  public getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/categories`);
  }
}
