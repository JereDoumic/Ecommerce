import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/Models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  email: string = "";
  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    
  }

  constructor(private fb: FormBuilder){

  }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  isValidField(field: string): boolean | null{
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    
    if(!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch (key) {
        case 'required':
          return "Este campo es requerido.";
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'pattern':
            return 'Formato de email invalido';  
      }
    }
    return null;
  }

  onSubmit(){
    
  }
}
