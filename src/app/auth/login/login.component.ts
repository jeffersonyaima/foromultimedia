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

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void { }

 async onGoogleLogin(){
   try{
     const user = await this.authSvc.loginGoogle();
     if(user){
      this.router.navigate(['/home']);
    }
   }
   catch(error){
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
    }

    catch(error){
      console.log(error)
    }

  }

}
