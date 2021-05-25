import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { descripcionSeccion, FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/services/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css'],
  providers: [FirestoreService],
})
export class AnimacionComponent implements OnInit {

  validar:boolean=false;
  cambioTitulo:boolean=false;
  descripcion_Seccion:Observable<descripcionSeccion>=null as any;
  filesAnimacion=this.firestoreService.array_archivosAnimacion;
  cargando:boolean=true;
  tituloProyecto:string='1. Agregar Titulo Proyecto aqui';
  actualizarTitulo:string='Digite titulo Nuevo';
  logo:string='../../../assets/Logotipo.png';

  

  constructor(private authSvc: AuthService, private firestoreService: FirestoreService, private readonly firestore: AngularFirestore,
    private storage: AngularFireStorage) {
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

    this.firestore.collection('secciones').doc('animacion').get().subscribe((resultado)=>{
      let info:any = resultado.data();
      console.log(info); 
      this.descripcion_Seccion=info.Descripción;
      this.cargando=false;
    })

  }


  actualizarDescripcion(){
    console.log(this.descripcion_Seccion);
    this.firestore.collection('secciones').doc('animacion').update({
      "Descripción":this.descripcion_Seccion
   })

  }
  
  goToLink(url: string){
    window.open(url, "_blank");
  }
  
  agregarejemplo(){
   /* console.log(this.idActual);
    this.firestore.collection('files').doc(this.idActual).update({
      "Titulo":this.tituloProyecto
  });*/
  }
  
  eliminarEjemplo(id:string){
    this.firestore.collection('files').doc(id).delete();
    console.log("Eliminado: "+id);
  }
  
  editarEjemplo(id:string){
    console.log(id);
  
    if(this.actualizarTitulo==='Digite titulo Nuevo'){
      console.log('Titulo no cambio');
      this.cambioTitulo=true;
    }
    else{
      this.firestore.collection('files').doc(id).update({
        "Titulo":this.actualizarTitulo
      })
      this.actualizarTitulo='Digite titulo Nuevo';
      this.cambioTitulo=false;
    
    }
  }
  
  /*----------------------STORAGE ----------------------------*/
  
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  
  startUpload(file:File) {
    console.log(file);
    // The storage path
    const path = `test/${Date.now()}_${file.name}`;
     // Reference to storage bucket
    const ref = this.storage.ref(path);
  
    // The main task
    this.task = this.storage.upload(path, file);
  
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
  
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
         this.downloadURL = await ref.getDownloadURL().toPromise();
        const sec = 'Animacion'
        const id = this.firestore.createId();
        const type = file.type;
        await this.firestore.collection('files').doc(id).set({downloadURL: this.downloadURL, path, seccion: sec, id:id, 
        Titulo:this.tituloProyecto, tipo:type})
        window.open('/animacion', "_self");
       
        
  
      }),
    )
  }
  
  isActive(snapshot:any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  
  
  isHovering: boolean;
  files: File[] = [];
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
       this.files.push(files.item(i));
   }
  }




  ngOnInit(): void {
   
  }

}
