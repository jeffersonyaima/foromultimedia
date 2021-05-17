import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgsrc3d : any;
  imgsrc2d : any;
  imgsrcguiones : any;
  imgsrcaudio : any;
  imgsrcprogramacion : any;
  imgsrcrealidad : any;
  imgsrclampara : any;


  constructor(private authSvc: AuthService, private firestore:AngularFirestore) {
    
    this.authSvc.afAuth.user.forEach((dato)=>{
      if(dato){
        
      console.log(dato.email); /*dato.email guarda valor "email" guardado en array dato*/
      let correo = dato.email; /* Se guarda en correo valor de dato.email*/

     /*MISMA FUNCION leerdatos DE FIRESTORE SERVICE, SE PUSO AQUI PORQUE ES NECESARIO*/
      /*this.firestore.collection('userlist', ref=>ref.where("email",'==',correo)).get().subscribe((resultado)=>{
        resultado.docs.forEach((item)=>{
          let usuario :any = item.data();
          console.log(usuario);
          let recarga:any = usuario.reload;
          console.log(recarga);
          if(recarga===0){
            console.log('Hay que recargar')
            this.actualizarReload(dato.email);
          }

          else{
            console.log('No hay que recargar')
          }

        })
      })*/
      }

      else{
        console.log('No esta logeado')
        
      }
    }) 

  }

  
  ngOnInit(): void {

    
    this.imgsrc3d='../../assets/3D.png', 
    this.imgsrc2d='../../assets/2D.png',
    this.imgsrcguiones='../../assets/guiones2.png',
    this.imgsrcaudio='../../assets/audio.png',
    this.imgsrcprogramacion='../../assets/promagramacion.png',
    this.imgsrcrealidad='../../assets/realidad.png';
    this.imgsrclampara='../../assets/lampara.png';

    (function ($) {
      $(window).on("load",function(){
        $(".container").css("opacity", 1)
        $("#precarga").delay(2500).fadeOut("slow");
      });
    })(jQuery);

  }

  async actualizarReload(email:string){
    await this.firestore.collection('userlist').doc(email).update({
      "reload":1
    });
    window.location.reload();
  }

}
