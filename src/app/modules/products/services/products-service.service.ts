import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../../../core/Models';

@Injectable({
  providedIn: 'root'
})


export class ProductsService{

  private baseURL = "http://localhost:3000";
  //private api = "https://fakestoreapi.com/products";

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/products`);
  }

  public getAllProductsJson(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/products`);
  }

  public getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/categories`);
  }

  public addProduct(product: Product): Observable<Product>{
    const productId = String(product.id);
    return this.httpClient.post<Product>(`${this.baseURL}/products`, product);
  }

  public addCategory(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(`${this.baseURL}/categories`, category);
  }

  public updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.baseURL}/products/${product.id}`, product);
  }

  public deleteProduct(product: Product): Observable<Product>{
    return this.httpClient.delete<Product>(`${this.baseURL}/products/${product.id}`);
  }
}
