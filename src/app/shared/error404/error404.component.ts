import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component {
  constructor(private router: Router){

  }

  goLanding(){
    this.router.navigate(["/landing"]);
  }
}
