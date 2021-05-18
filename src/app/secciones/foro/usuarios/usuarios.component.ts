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
  buscarUsuario:string='';

  n_reportesUB:number=0;
  nombre_usuarioUB:string='';

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

  async buscarUsuarioenLista(){
    try {
      console.log(this.buscarUsuario);
    this.sebuscoUsuario=true;
    /*this.firestoreService.getUsuarioBuscado(this.buscarUsuario);*/
    this.firestore.collection('userlist', ref=>ref.where("nombreusuario",'==',this.buscarUsuario)).get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let usuario :any = item.data();
        this.n_reportesUB=usuario.N_report;
        this.nombre_usuarioUB=usuario.nombreusuario;

      })
    })
    }
    catch(error){
      console.log(error);

    }

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
