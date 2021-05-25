import { Component, OnInit } from '@angular/core';
import { FirestoreService} from 'src/app/services/firestore/firestore.service';
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

  preguntasGuiones$=this.firestoreService.array_preguntasGuiones;
  preguntasAnimacion$ = this.firestoreService.array_preguntasAnim;
  preguntasAudio$ = this.firestoreService.array_preguntasAudio;
  preguntasVirtuales$ = this.firestoreService.array_preguntasVirtual;
  preguntasProgramacion$ = this.firestoreService.array_preguntasProgramacion;
  respuestas$=this.firestoreService.array_respuestas;

  nom_usua:string = "";
  myDate = new Date();

  respuesta:string = ''; /*Esto reemplaza formulario de respuestas, para usar ngModel en cambio*/ 
  preguntaEditar:string='Editar pregunta';
  respuestaEditar:string='Editar respuesta';
  
 

  validar:boolean=false; /*Validar si es admin */
  own_q:boolean=false;
  own_a:boolean=false;
  block:boolean=false; /* Validar si esta bloqueado */

  cargando:boolean=true;

  preguntaHecha:string='';


  public preguntaForm= new FormGroup({
  })

  public respuestaForm= new FormGroup({
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

    this.respuestaForm=this.fb.group({
      respuesta:['']
    })

  }

  ngOnInit(): void {
    this.initForm();
    
    (function ($) {
      $('.categoria1').click(function(){
        $('.contenedor-preguntas1').show("swing");
      });


    })(jQuery);
  }

  /* ----------------------------------PREGUNTAS----------------------------------------------- */
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



  async agregarPregunta(){
    if(this.preguntaForm.valid){
    console.log("El foro esta conectado con la base de datos");
    console.log('registro',this.preguntaForm.value);
    this.preguntaHecha='PREGUNTA HECHA, HACER CLICK EN LA X';

    const id= this.firestore.createId();
    const formValue = this.preguntaForm.value; /* Obtengo valor del formulario */
    const usuario = this.nom_usua; /* Guardo en variable "usuario" en valor de nom_usua --> "usuario" debe ser el mismo 
    nombre que se encuentra en la BD para que al interpolarlo lo pueda leer correctamente*/
    const formValueU = {usuario, ...formValue} /*Concadeno el nombre de usuario a los datos del formulario */
    const formValueID = {id,...formValueU}
    /*Guardar Fecha*/ 
    const Fecha= this.myDate.toDateString()
    const formValueReady = {Fecha,...formValueID}
    await this.firestoreService.guardarpregunta(formValueReady);
    this.router.navigate(['/foro']);
    }
    else{
      this.preguntaHecha='Haga una pregunta porfavor';
    }
    

  }

  async editarPreguntaPropia(id:string, seccion_enviado:string){
    /*Llenar formulario manualmente, desde html ya no se usa FormGroup pero Firestore si lo necesita*/
    this.preguntaForm.setValue({pregunta:this.preguntaEditar,seccion:seccion_enviado})
    const formValue = this.preguntaForm.value; 
    this.firestoreService.editarPregunta(id,formValue);  
    this.preguntaEditar='Editar pregunta';
  }

  restartPregunta(){
    this.preguntaHecha='';
  }

  /* ----------------------------------RESPUESTAS----------------------------------------------- */

  async agregarRespuesta(id_p:string){
    this.respuestaForm.setValue({respuesta:this.respuesta});

    const id = this.firestore.createId();
    const formValue = this.respuestaForm.value;
    const FormvalueId = {id,...formValue};
    const usuario = this.nom_usua; /* Guardo en variable "usuario" en valor de nom_usua --> "usuario" debe ser el mismo 
    nombre que se encuentra en la BD para que al interpolarlo lo pueda leer correctamente*/
    const FormValueU = {usuario, ...FormvalueId} /*Concadeno el nombre de usuario a los datos del formulario */
    const FormValueReady = {id_p,... FormValueU};
    await this.firestoreService.guardarrespuesta(FormValueReady);
  }

  async abrirRespuestas(id_p:string){
    this.respuestas$=this.firestoreService.getRespuestas(id_p);
    
  }

  adminElim_Respuesta(id:string){
    console.log("Respuesta Eliminada");
    console.log(id);
    this.firestoreService.adminEliminaRespuesta(id);
  }

  eliminarResp_Propia(id:string){
    console.log("Respuesta Eliminada");
    console.log(id);
    this.firestoreService.eliminaRespuestaPropia(id);
  }

  async editarRespuestaPropia(id:string){
    console.log(this.respuestaEditar);
    console.log(id);
    /*Llenar formulario manualmente, desde html ya no se usa FormGroup pero Firestore si lo necesita*/
    this.respuestaForm.setValue({respuesta:this.respuestaEditar})
    const formValue = this.respuestaForm.value; 
    this.firestoreService.editarRespuesta(id,formValue);  
    this.respuestaEditar='Editar respuesta';
  }





  /* ----------------------------------OTRAS FUNCIONES ADMIN----------------------------------------------- */

  

  async reportarUsuario(usuarioenviado:string){
    console.log("Usuario Reportado");
    console.log(usuarioenviado)   

    this.firestore.collection('userlist', ref=>ref.where("nombreusuario",'==',usuarioenviado)).get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let usuario :any = item.data();
        const numeroReportes = usuario.N_report;
        const numeroReportesAc = numeroReportes + 1;
        this.firestore.collection('userlist').doc(usuario.email).update({
          "N_report":numeroReportesAc
      });
      })
    })
  }

}
