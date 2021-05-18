import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ActionSequence } from 'selenium-webdriver';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { EmailValidator } from '@angular/forms';


export interface Lista_Usuarios{
  email:string;
  name:string;
  apellido:string;
  nombreusuario:string;
  id: string;
  password:string;
  admin:Boolean;
  block:Boolean;
  N_report:number;
  
}

export interface Lista_Preguntas{
  pregunta:string;
  seccion:string;
  usuario:string;
  id:string;
  Fecha:string;
}

export interface Lista_Respuestas{
  id:string;
  id_p:string;
  respuesta:string;
  usuario:string
}

export interface UpdatePregunta{
  pregunta:string
}

export interface descripcionSeccion{
  Descripción:string
}

export interface archivos{
  downloadURL:string;
  path:string;
  seccion:string;
  Titulo:string;
  tipo:string;
  id:string
}


@Injectable()

export class FirestoreService {

  nom_usua:string = "";

  array_usuarios:Observable<Lista_Usuarios[]> = null as any;
  array_preguntasGuiones:Observable<Lista_Preguntas[]> = null as any;
  array_preguntasAnim:Observable<Lista_Preguntas[]> = null as any;
  array_preguntasAudio:Observable<Lista_Preguntas[]> = null as any;
  array_preguntasVirtual:Observable<Lista_Preguntas[]> = null as any;
  array_preguntasProgramacion:Observable<Lista_Preguntas[]> = null as any;
  infoUsuarioBuscado:Observable<Lista_Usuarios[]> = null as any;

  array_respuestas:Observable<Lista_Respuestas[]>=null as any;

  array_archivosGuiones:Observable<archivos[]>=null as any;
  array_archivosAnimacion:Observable<archivos[]>=null as any;
  array_archivosAudio:Observable<archivos[]>=null as any;
  array_archivosAplicacion:Observable<archivos[]>=null as any;
  array_archivosProgramacion:Observable<archivos[]>=null as any;

  




  private coleccionUsuarios!: AngularFirestoreCollection<Lista_Usuarios>;
  private coleccionPreguntas!: AngularFirestoreCollection<Lista_Preguntas>;
  private coleccionRespuestas!: AngularFirestoreCollection<Lista_Respuestas>;

  constructor(private storage: AngularFireStorage, private readonly firestore: AngularFirestore, private authSvc:AuthService) {
    this.coleccionUsuarios = firestore.collection<Lista_Usuarios>('userlist');
    this.coleccionPreguntas = firestore.collection<Lista_Preguntas>('preguntas');
    this.coleccionRespuestas = firestore.collection<Lista_Respuestas>('respuestas');
    this.getUsuario();
    this.getPreguntas();
    this.getarchivos();

  }


  async guardarusuario(registerForm: Lista_Usuarios): Promise<void>{

    return new Promise(async (resolve, reject)=>{
      try{
        /*const idn= this.firestore.createId();
        const data = {idn, ...registerForm};*/
        registerForm.email=registerForm.email.toLocaleLowerCase();
        const data = registerForm;
        const result = this.coleccionUsuarios.doc(registerForm.email).set(data);
        resolve(result);
        console.log("Registro enviado a FireStore!");
      }
      catch(error){
        reject(error.message);
      }

    });
 }



 async guardarpregunta(preguntaForm: Lista_Preguntas): Promise<void>{

  return new Promise(async (resolve, reject)=>{
    try{

      const data = preguntaForm;
      const result = this.coleccionPreguntas.doc(preguntaForm.id).set(data);
      resolve(result);
      console.log("Pregunta enviado a FireStore!");
    }
    catch(error){
      reject(error.message);
    }

  });
}

async guardarrespuesta(respuestaForm: Lista_Respuestas): Promise<void>{

  return new Promise(async (resolve, reject)=>{
    try{

      const data = respuestaForm;
      const result = this.coleccionRespuestas.doc(respuestaForm.id).set(data);
      resolve(result);
      console.log("Respuesta enviado a FireStore!");
    }
    catch(error){
      reject(error.message);
    }

  });
}






   /*FUNCION FUNCIONA PERO NO SE ESTA LLAMANDO*/ 

 leerdatos(correo:any){
    let respuesta;
    this.firestore.collection('userlist', ref=>ref.where("email",'==',correo)).get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let usuario :any = item.data();
        let ad:any = usuario.admin;
        console.log(ad);
        respuesta = ad;
      })
    })
    return respuesta;
   }

   
   /* Para leer toda la coleccion userlist y ponerlo en lista*/
  private getUsuario():void {
    this.array_usuarios=this.coleccionUsuarios.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Lista_Usuarios))
    )
    
  }


  /*private getPreguntas():void {
    this.array_preguntasGuiones=this.coleccionPreguntas.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )
    
  }*/

  private getPreguntas(): void{
    this.array_preguntasGuiones=this.firestore.collection('preguntas', ref=>ref.where("seccion",'==','guiones')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )

    this.array_preguntasAnim=this.firestore.collection('preguntas', ref=>ref.where("seccion",'==','animacion')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )

    this.array_preguntasAudio=this.firestore.collection('preguntas', ref=>ref.where("seccion",'==','audio')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )

    this.array_preguntasVirtual=this.firestore.collection('preguntas', ref=>ref.where("seccion",'==','virtual')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )

    this.array_preguntasProgramacion=this.firestore.collection('preguntas', ref=>ref.where("seccion",'==','programacion')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )
  }

  getRespuestas(idp:string):Observable<Lista_Respuestas[]>{
    console.log(idp);
    this.array_respuestas=this.firestore.collection('respuestas', ref=>ref.where("id_p",'==',idp)).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Respuestas))
    )
    console.log(this.array_respuestas);
    return this.array_respuestas;

  }

  getarchivos(){
    this.array_archivosGuiones=this.firestore.collection('files', ref=>ref.where("seccion",'==','Guiones')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as archivos))
    )

    this.array_archivosAnimacion=this.firestore.collection('files', ref=>ref.where("seccion",'==','Animacion')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as archivos))
    )

    this.array_archivosAudio=this.firestore.collection('files', ref=>ref.where("seccion",'==','Audio')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as archivos))
    )

    this.array_archivosAplicacion=this.firestore.collection('files', ref=>ref.where("seccion",'==','Aplicacion')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as archivos))
    )

    this.array_archivosProgramacion=this.firestore.collection('files', ref=>ref.where("seccion",'==','Programacion')).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as archivos))
    )

  }

  getUsuarioBuscado(nomusuario:string):Observable<Lista_Usuarios[]>{
    console.log(nomusuario);
    this.infoUsuarioBuscado=this.firestore.collection('userlist', ref=>ref.where("nombreusuario",'==',nomusuario)).snapshotChanges().pipe(
      map(actions=> actions.map(a => a.payload.doc.data() as Lista_Usuarios))
    )
    return this.infoUsuarioBuscado;

  }


  adminEliminaUsuario(correo:string): Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try{
          const result = await this.coleccionUsuarios.doc(correo).delete();
          resolve(result);
      }
      catch(err){
        reject(err.message);
      }
    });
  }


  
  adminEliminaPregunta(id:string): Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try{
          const result = await this.coleccionPreguntas.doc(id).delete();
          resolve(result);
      }
      catch(err){
        reject(err.message);
      }
    }); 
  }

  adminEliminaRespuesta(id:string): Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try{
          const result = await this.coleccionRespuestas.doc(id).delete();
          resolve(result);
      }
      catch(err){
        reject(err.message);
      }
    }); 
  }


   
 eliminaPreguntaPropia(id:string): Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try{
          const result = await this.coleccionPreguntas.doc(id).delete();
          resolve(result);
      }
      catch(err){
        reject(err.message);
      }
    });
  }

    
 eliminaRespuestaPropia(id:string): Promise<void>{
  return new Promise(async (resolve, reject)=>{
    try{
        const result = await this.coleccionRespuestas.doc(id).delete();
        resolve(result);
    }
    catch(err){
      reject(err.message);
    }
  });
}


  public updateUsuario(name: string, data: any) {
    return this.firestore.collection('usuarios').doc(name).set(data);
  }

  editarPregunta(id:string, preguntaActualizada:Lista_Preguntas){
    console.log(preguntaActualizada.pregunta);
    this.firestore.collection('preguntas').doc(id).update({
        "pregunta":preguntaActualizada.pregunta
    });
     
  }

  editarRespuesta(id:string, respuestaActualizada:Lista_Respuestas){
    console.log(respuestaActualizada.respuesta);
    this.firestore.collection('respuestas').doc(id).update({
        "respuesta":respuestaActualizada.respuesta
    });
     
  }

  adminBloqueaUsuario(emailenviado:string){

    this.firestore.collection('userlist').doc(emailenviado).update({
      "block":true
    })

    /*this.firestore.collection('userlist', ref=>ref.where("nombreusuario",'==',usuarioenviado)).get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let usuario :any = item.data();
        this.firestore.collection('userlist').doc(usuario.email).update({
          "block":true
      });
      })
    })*/

  }

  adminDesbloqueaUsuario(emailenviado:string){

    this.firestore.collection('userlist').doc(emailenviado).update({
      "block":false
    })
  }


  /*------STORAGE------ */

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

}

