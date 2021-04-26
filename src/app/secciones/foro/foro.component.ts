import { Component, OnInit } from '@angular/core';
import { Observable, TimeoutError } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import {AuthService} from '../../auth/services/auth.service';
declare var jQuery: any;


@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  validar:boolean=false;
  own_q:boolean=true;
  own_a:boolean=true;
  block:boolean=false;

  cargando:boolean=true;
   


  constructor(private authSvc: AuthService, private readonly firestore: AngularFirestore) {
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
          console.log(ad);
          console.log(bl);
          this.validar=ad;
          this.block=bl;
          console.log(this.validar);
          console.log(this.block);
          this.cargando=false;
        })
      })

      }
      else console.log('NO ESTA LOGEADO');
    })
  }


  ngOnInit(): void {
    (function ($) {
      $('.categoria1').click(function(){
        $('.contenedor-preguntas1').show("swing");
      });


    })(jQuery);


  }

}
