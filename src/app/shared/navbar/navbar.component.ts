import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './../../auth/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection, fromDocRef} from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService],
})
export class NavbarComponent{

  public user$: Observable<any> = this.authSvc.afAuth.user;
  
  constructor(private authSvc: AuthService, private router:Router, private firestore:AngularFirestore) { }

  async onLogout(){
    try{
      this.authSvc.logout();

      /*await this.authSvc.afAuth.user.forEach((dato)=>{
      let correo = dato.email;
      console.log(correo);
      this.firestore.collection('userlist').doc(correo).update({
        "reload":0
      });
      })*/
    
     
    }
    catch(error){
      console.log(error);
    }
  }



}
