import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';
import {AuthService} from '../../auth/services/auth.service';

/*cloud storage*/
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-guiones',
  templateUrl: './guiones.component.html',
  styleUrls: ['./guiones.component.css'],
  providers: [FirestoreService],
})
export class GuionesComponent implements OnInit {

  validar:boolean=false;

  constructor( private authSvc: AuthService, private firestoreService: FirestoreService, private readonly firestore: AngularFirestore, private fb:FormBuilder) {
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
          console.log(ad);
          this.validar=ad;
          console.log(this.validar);
        })
      })

      }
      else console.log('NO ESTA LOGEADO');
    })

  }

  /*cloud storage*/


  public archivoForm = new FormGroup({

  });
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje:number=0;
  public finalizado = false;

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo($event:any) {
    if ($event.target.files.length > 0) {
      for (let i = 0; i < $event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${$event.target.files[i].name}`;
        this.nombreArchivo = $event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', $event.target.files[i], $event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia =  this.firestoreService.referenciaCloudStorage(this.nombreArchivo)
    let tarea = this.firestoreService.tareaCloudStorage(this.nombreArchivo, archivo);


    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
    });
  }

  private initForm():void{
    this.archivoForm = this.fb.group({
      archivo:[null,[Validators.required]]
    })
  }

  ngOnInit(): void {
   this.initForm();

  }

}