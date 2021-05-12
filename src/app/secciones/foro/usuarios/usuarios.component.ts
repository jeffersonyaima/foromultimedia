import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService, Lista_Usuarios} from 'src/app/services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import {AuthService} from '../../../auth/services/auth.service'
import {FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [FirestoreService],
})
export class UsuariosComponent implements OnInit {

  usuario$=this.firestoreService.array_usuarios; /* LLenando usuario$ con informacion del array_usuarios, 
  el cual ya esta cargado de informacion de los datos que encuentre en la base de datos*/
  usuarioBuscado$=this.firestoreService.infoUsuarioBuscado;
  sebuscoUsuario:boolean=false;

  public user$: Observable<any> = this.authSvc.afAuth.user;

  public buscarUsuarioForm= new FormGroup({
  })

    

  constructor( private fb: FormBuilder, private authSvc: AuthService, private firestoreService: FirestoreService, private readonly firestore: AngularFirestore) {
  }

  private initForm():void{

    this.buscarUsuarioForm = this.fb.group({
     nombreusuario:['']
    })

  }

  eliminarUsuario(correo:string){
    this.firestoreService.adminEliminaUsuario(correo);
  }

  ngOnInit(): void {
    this.initForm();
  }

  buscarUsuarioenLista(){
    console.log(this.buscarUsuarioForm.value);
    this.sebuscoUsuario=true;
    const nombreUsuario = this.buscarUsuarioForm.get('nombreusuario')?.value;
    this.firestoreService.getUsuarioBuscado(nombreUsuario);

  }

  verTodosUsuarios(){
    this.sebuscoUsuario=false;
  }

  bloquearUsuario(emailusuario:string){
    this.firestoreService.adminBloqueaUsuario(emailusuario);
  }

  desbloquearUsuario(emailusuario:string){
    this.firestoreService.adminDesbloqueaUsuario(emailusuario);
  }

}
