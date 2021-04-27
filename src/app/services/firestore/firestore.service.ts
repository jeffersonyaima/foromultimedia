import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

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

@Injectable()

export class FirestoreService {

  correo:any;

  array_usuarios:Observable<Lista_Usuarios[]> = null as any;


  private coleccionUsuarios!: AngularFirestoreCollection<Lista_Usuarios>;

  constructor(private readonly firestore: AngularFirestore) {
    this.coleccionUsuarios = firestore.collection<Lista_Usuarios>('userlist');
    this.getUsuario();
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

  public updateUsuario(name: string, data: any) {
    return this.firestore.collection('usuarios').doc(name).set(data);
  }

}
