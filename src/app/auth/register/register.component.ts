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
    /*email : new FormControl(''),
    password: new FormControl(''),*/
  })

  
  constructor(private fb: FormBuilder, private authSvc:AuthService, private router: Router,private firestoreService: FirestoreService) {} 


  private initForm():void{
    this.registerForm = this.fb.group({
      email:[''],
      name:[''],
      apellido:[''],
      nombreusuario:[''],
      password:[''],
    });
  }

  
 ngOnInit(): void  {
  this.initForm();
 }


 onRegisNuevo(){
  console.log('registro',this.registerForm.value);
   const formValue = this.registerForm.value;
   this.firestoreService.guardarusuario(formValue);
   this.firestoreService.registrarUsuario(formValue);
 }


 onRegister(){

   const {email, password}= this.registerForm.value;
   const user = this.authSvc.register(email, password);

    if(user){
      this.router.navigate(['/home']);
    }
    
  }
}
