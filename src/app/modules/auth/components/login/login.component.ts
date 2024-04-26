import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/Models';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userList: User[] = [];
  email: string = "";
  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(res=>{
      this.userList = res;
    })
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService){

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

  async onSubmit() {
    if (this.loginForm.valid) {
      if(this.checkEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password) === false){
        this.toastr.error("Revise y vuelva a intentarlo", "Contraseña o email incorrectos");
      }
    } 

    try {
      
      let isLogin: boolean = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      
      if (isLogin) {
        this.router.navigate(["/landing"]);
      }
      else {
        this.email = this.loginForm.value.email;
        this.loginForm.reset({ email: this.email });
        
      }

    } catch (error) {
      console.log(error);
    }
  }

  checkEmailAndPassword(email: string, password: string){
    for(let user of this.userList){
      if(user.email?.toLowerCase() === email.toLowerCase() && user.password === password){
        return true;
      }
    }
    return false;
  }

  goRegister(){
    this.router.navigate(["auth/register"]);
  }
}
