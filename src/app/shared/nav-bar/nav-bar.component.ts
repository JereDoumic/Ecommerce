import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data-service.service';
import { AuthService } from '../../modules/auth/services/auth-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  quantity: number | null = 0;
  userToken: number | undefined; 

  constructor(private router: Router, private dataService: DataService, private authService: AuthService){

  }

  ngOnInit(): void {
    this.dataService.getQuiantity().subscribe(res => {
      this.quantity = res;
    });
    this.userToken = Number(localStorage.getItem("token"));
  }

  goAddProduct(){
    this.router.navigate(['products/addProducts']);
  }

  goAddCategory(){
    this.router.navigate(['categories']);
  }

  goLogin(){
    this.router.navigate(['auth/login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['landing']);
    location.reload();
  }

  goCart(){
    this.router.navigate(['cart']);
  }

}
