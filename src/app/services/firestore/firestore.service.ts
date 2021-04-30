import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';


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
}



@Injectable()

export class FirestoreService {

  nom_usua:string = "";

  array_usuarios:Observable<Lista_Usuarios[]> = null as any;
  array_preguntas:Observable<Lista_Preguntas[]> = null as any;


  private coleccionUsuarios!: AngularFirestoreCollection<Lista_Usuarios>;
  private coleccionPreguntas!: AngularFirestoreCollection<Lista_Preguntas>;

  constructor(private readonly firestore: AngularFirestore, private authSvc:AuthService) {
    this.coleccionUsuarios = firestore.collection<Lista_Usuarios>('userlist');
    this.coleccionPreguntas = firestore.collection<Lista_Preguntas>('preguntas');
    this.getUsuario();
    this.getPreguntas();


  }


  async guardarusuario(registerForm: Lista_Usuarios): Promise<void>{

    return new Promise(async (resolve, reject)=>{
      try{
        /*const idn= this.firestore.createId();
        const data = {idn, ...registerForm};*/
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


  private getPreguntas():void {
    this.array_preguntas=this.coleccionPreguntas.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Lista_Preguntas))
    )
    
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


  public updateUsuario(name: string, data: any) {
    return this.firestore.collection('usuarios').doc(name).set(data);
  }

}
