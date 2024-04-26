import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class apiService {

  private baseURL = "http://localhost:1234";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  public getToAuth(email: string, password: string):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }

  public addUser(user: User):Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}/users`, user);
  } 
  
}
