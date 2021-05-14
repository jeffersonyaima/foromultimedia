import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { descripcionSeccion, FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import {AuthService} from '../../auth/services/auth.service';
declare var jQuery: any;

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
  providers: [FirestoreService],
})
export class ProgramacionComponent implements OnInit {

  validar:boolean=false;
  descripcion_Seccion:Observable<descripcionSeccion>=null as any;
  cargando:boolean=true;

  constructor( private authSvc: AuthService, private firestoreService: FirestoreService, private readonly firestore: AngularFirestore) {
    this.authSvc.afAuth.user.forEach((dato)=>{  /* en Datos se guarda informacion del usuario loogeado */
      console.log(dato); /*Dato es array que guarda informacion*/ 
      if(dato) {
        console.log(dato.email); /*dato.email guarda valor "email" guardado en array dato*/ 
        let correo = dato.email; /* Se guarda en correo valor de dato.email*/ 

        this.firestore.collection('secciones').doc('programacion').get().subscribe((resultado)=>{
          let info:any = resultado.data();
          console.log(info);
          this.descripcion_Seccion=info.Descripción;
          this.cargando=false;
        })
   

     /*MISMA FUNCION leerdatos DE FIRESTORE SERVICE, SE PUSO AQUI PORQUE ES NECESARIO*/ 
      this.firestore.collection('userlist', ref=>ref.where("email",'==',correo)).get().subscribe((resultado)=>{
        resultado.docs.forEach((item)=>{
          let usuario :any = item.data();
          let ad:any = usuario.admin;
          console.log(ad);
          this.validar=ad;
          console.log(this.validar);
        })
      })
       
      }
      else console.log('NO ESTA LOGEADO');
    })

  }

  public user$: Observable<any> = this.authSvc.afAuth.user;

  
  ngOnInit(): void {
    (function ($) {
     
    })(jQuery);
  }

}
