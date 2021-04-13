import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Usuarios{
  email:string;
  name:string;
  apellido:string;
  nombreusuario:string;
  id: string;
  password:string;
  admin:Boolean;
  
}

@Injectable()

export class FirestoreService {

  correo:any;


  usuarios!: Observable<Usuarios>;
  private coleccionUsuarios!: AngularFirestoreCollection<Usuarios>;

  constructor(private readonly firestore: AngularFirestore) {
    this.coleccionUsuarios = firestore.collection<Usuarios>('userlist');
   }


  async guardarusuario(registerForm: Usuarios): Promise<void>{

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





   //Crea un nuevo usuario
   public registrarUsuario(data: Usuarios) {
    return this.firestore.collection('usuario').add(data);
   }

   //Obtiene un gato
  public getUsuario(name: string) {
    return this.firestore.collection('usuarios').doc(name).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getUsuarios() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  //Actualiza un gato
  public updateUsuario(name: string, data: any) {
    return this.firestore.collection('usuarios').doc(name).set(data);
  }

}
