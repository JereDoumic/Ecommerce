import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/Models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = "";
  private userList: User[] = [];
  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(res=>{
      this.userList = res;
    })
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService){

  }

  registerForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  isValidField(field: string): boolean | null{
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    
    if(!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

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
    
     try {
      
      let user: User = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        userName: this.registerForm.value.userName,
        id_user: null
      }

      if(this.registerForm.valid){
        if(this.checkIfEmailIsRegistred(user.email!)){
          this.toastr.error("Email asociado a una cuenta existente", "Email en uso"); 
        }
        if(this.checkIfUserNameIsRegistred(user.userName!)){
          this.toastr.error("Nombre de usuario asociado a una cuenta existente, pruebe con otro", "Nombre de usuario en uso"); 
        } else{
          this.authService.register(user).subscribe({
            next: (result) => {
              this.toastr.success("Registro exitoso"); 
              this.router.navigate(["/auth/login"]);
          },
          error: (error) => {
              throw error;
          }
          })
        }
        }
    
    } catch (error) {
      console.log(error);
    } 
  }

  checkIfEmailIsRegistred(email: string){
    for(let user of this.userList){
      if(user.email === email){
        return true;
      }
    }
    return false;
  }

  checkIfUserNameIsRegistred(userName: string){
    for(let user of this.userList){
      if(user.userName === userName){
        return true;
      }
    }
    return false;
  }

  goLogin(){ 
    this.router.navigate(["auth/login"]);
  }
}
