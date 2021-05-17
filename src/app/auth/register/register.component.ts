import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
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
  registroInvalido:boolean = false; 

  private IsEmail = /\S+@\S+\.\S+/;

  
  constructor(private fb: FormBuilder, private authSvc:AuthService, private router: Router,private firestoreService: FirestoreService) {
    this.registroInvalido=false;
  } 


  private initForm():void{
    this.registerForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern(this.IsEmail)]],
      name:['', [Validators.required]],
      apellido:['', [Validators.required]],
      nombreusuario:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]],
      admin:[false],
      block:[false],
      N_report:[0],
      reload:[0]
    });
  }

  
 ngOnInit(): void  {
  this.initForm();
 }


 async onRegisNuevo(){
   if(this.registerForm.valid){

    console.log('registro',this.registerForm.value);
    
   const formValue = this.registerForm.value;
   await this.firestoreService.guardarusuario(formValue);

   const {email, password}= this.registerForm.value;
   const user = this.authSvc.register(email, password);

    if(user){
      this.router.navigate(['/home']);
    }

   }

  else {
    this.registroInvalido=true;
    console.log("Formulario no valido");
  }
 }

 isValidField(field: string): string{
   const validatedField = this.registerForm.get(field);
   return (!validatedField?.valid && validatedField?.touched)
   ? 'is-invalid': validatedField?.touched ? 'is-valid': '';
 }

 redireccionar(){

  this.router.navigate(['/register']);
  console.log("Redireccionado!!");
  window.location.reload();
   
 }


 

 onRegister(){

   const {email, password}= this.registerForm.value;
   const user = this.authSvc.register(email, password);

    if(user){
      this.router.navigate(['/home']);
    }
  }

}
