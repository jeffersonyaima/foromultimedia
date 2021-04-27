import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService, Lista_Usuarios} from 'src/app/services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import {AuthService} from '../../../auth/services/auth.service';
import { listUser } from './listUser.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [FirestoreService],
})
export class UsuariosComponent implements OnInit {

  usuario$=this.firestoreService.array_usuarios; /* LLenando usuario$ con informacion del array_usuarios, 
  el cual ya esta cargado de informacion de los datos que encuentre en la base de datos*/


  public user$: Observable<any> = this.authSvc.afAuth.user;
  

  constructor(private authSvc: AuthService, private firestoreService: FirestoreService, private readonly firestore: AngularFirestore) {
    
   }

  ngOnInit(): void {
  }

}
