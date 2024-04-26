import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { User } from '../../../core/Models';
import { apiService } from '../../../core/services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null | undefined = null;
  private userList: User[] = [];

  constructor(private apiService: apiService) { }

  public async login(email: string, password: string):Promise<boolean>{
    let isLogin = false;

    try{
      let apiRespone = this.apiService.getToAuth(email, password);
      
      let userResponse = await lastValueFrom(apiRespone);
      
      this.user = userResponse;
      
      if(this.user){
        localStorage.setItem("token", this.user.id_user!.toString());
        isLogin = true;
      }
    } catch(error){
      throw error;
    }
   
    return isLogin;
  }

  public register(user: User){
      return this.apiService.addUser(user);
  }

  public getAllUsers(){
    return this.apiService.getAllUsers();
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
  }

  public checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }
}
