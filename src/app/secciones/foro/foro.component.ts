import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import {FormGroup, FormBuilder} from '@angular/forms'
import { AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/services/auth.service';
import { Router } from '@angular/router';

declare var jQuery: any;


@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
  providers:[FirestoreService]
})
export class ForoComponent implements OnInit {

  preguntas$=this.firestoreService.array_preguntas; 
  nom_usua:string = "";

  validar:boolean=false; /*Validar si es admin */
  own_q:boolean=false;
  own_a:boolean=false;
  block:boolean=false; /* Validar si esta bloqueado */

  cargando:boolean=true;


  public preguntaForm= new FormGroup({
  })

  
  constructor(private router: Router, private firestoreService: FirestoreService, private fb: FormBuilder, private authSvc: AuthService, private readonly firestore: AngularFirestore) {
    this.authSvc.afAuth.user.forEach((dato)=>{  /* en Datos se guarda informacion del usuario loogeado */
      console.log(dato); /*Dato es array que guarda informacion*/
      if(dato) {
        console.log(dato.email); /*dato.email guarda valor "email" guardado en array dato*/
        let correo = dato.email; /* Se guarda en correo valor de dato.email*/

     /*MISMA FUNCION leerdatos DE FIRESTORE SERVICE, SE PUSO AQUI PORQUE ES NECESARIO*/
      this.firestore.collection('userlist', ref=>ref.where("email",'==',correo)).get().subscribe((resultado)=>{
        resultado.docs.forEach((item)=>{
          let usuario :any = item.data();
          let ad:any = usuario.admin;
          let bl:any = usuario.block;
          let us:any = usuario.nombreusuario; /*Guardo el nombre de usuario actual*/ 

          this.validar=ad;
          this.block=bl;
          this.nom_usua=us, /*Guardo el variable local nom_usua en nombre de usuario local*/ 

          this.cargando=false;
        })
      })

      }
      else console.log('NO ESTA LOGEADO');
    })
  }

  private initForm():void{
    this.preguntaForm = this.fb.group({
      pregunta:[''],
      seccion:['']
    });
  }

  ngOnInit(): void {
    this.initForm();
    
    (function ($) {
      $('.categoria1').click(function(){
        $('.contenedor-preguntas1').show("swing");
      });


    })(jQuery);
  }

  adminElim_Pregunta(id:string){
    console.log("Pregunta Eliminada");
    console.log(id);
    this.firestoreService.adminEliminaPregunta(id);
  }

  eliminarPreg_Propia(id:string){
    console.log("Pregunta Eliminada");
    console.log(id);
    this.firestoreService.eliminaPreguntaPropia(id);
  }


  async algo(){
    console.log("El foro esta conectado con la base de datos");
    console.log('registro',this.preguntaForm.value);

    const id= this.firestore.createId();
    const formValue = this.preguntaForm.value; /* Obtengo valor del formulario */
    const usuario = this.nom_usua; /* Guardo en variable "usuario" en valor de nom_usua --> "usuario" debe ser el mismo 
    nombre que se encuentra en la BD para que al interpolarlo lo pueda leer correctamente*/
    const formValueU = {usuario, ...formValue} /*Concadeno el nombre de usuario a los datos del formulario */
    const formValueReady = {id,...formValueU}
    await this.firestoreService.guardarpregunta(formValueReady);
    this.router.navigate(['/foro']);

  }
  

}
