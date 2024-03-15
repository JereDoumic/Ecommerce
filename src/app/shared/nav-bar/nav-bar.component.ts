import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{

  quantity: number | null = 0;

  constructor(private router: Router, private dataService: DataService){

  }

  ngOnInit(): void {
    this.dataService.getQuiantity().subscribe(res => {
      this.quantity = res;
    });
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

  goCart(){
    this.router.navigate(['cart']);
  }

}
