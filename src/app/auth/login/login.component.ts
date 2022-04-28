import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  registroInvalido:boolean = false; 
  constructor(private authSvc: AuthService, private router: Router) {
    this.registroInvalido=false;
   }

  ngOnInit(): void { }

 async onGoogleLogin(){
   try{
     const user = await this.authSvc.loginGoogle();
     if(user){
      this.router.navigate(['/home']);
    }
   }
   catch(error){
    this.registroInvalido=true;
     console.log(error);
   }
  }

  async onLogin(){

    const {email, password} = this.loginForm.value;
    try{
     const user = await this.authSvc.Login(email, password);
     if(user){
      window.open('/home', "_self");
     }
     else{
      this.registroInvalido=true;
     }
    }

    catch(error){
      this.registroInvalido=true;
      console.log(error)
    }

  }

  redireccionar(){

    this.router.navigate(['/login']);
    console.log("Redireccionado!!");
    window.location.reload();
     
   }

}
