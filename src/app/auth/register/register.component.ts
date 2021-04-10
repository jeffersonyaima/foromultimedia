import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import {AuthService} from './../services/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[FirestoreService]
})
export class RegisterComponent implements OnInit {


  public registerForm= new FormGroup({
  })

  
  constructor(private fb: FormBuilder, private authSvc:AuthService, private router: Router,private firestoreService: FirestoreService) {} 


  private initForm():void{
    this.registerForm = this.fb.group({
      email:[''],
      name:[''],
      apellido:[''],
      nombreusuario:[''],
      password:[''],
      admin:[false]
    });
  }

  
 ngOnInit(): void  {
  this.initForm();
 }


 async onRegisNuevo(){
  console.log('registro',this.registerForm.value);

   const formValue = this.registerForm.value;
   await this.firestoreService.guardarusuario(formValue);

   const {email, password}= this.registerForm.value;
   const user = this.authSvc.register(email, password);

    if(user){
      this.router.navigate(['/home']);
    }
   
 }

 onRegister(){

   const {email, password}= this.registerForm.value;
   const user = this.authSvc.register(email, password);

    if(user){
      this.router.navigate(['/home']);
    }
    
  }
}
