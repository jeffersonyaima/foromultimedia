import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';


//@Injectable()


@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(public afAuth: AngularFireAuth) {}

  async loginGoogle(){
    try{
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    }
    catch(error){
    console.log(error);
    return 0}
  }

  async Login(email:string, password:string){

    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } 
    catch(error){
      console.log(error);
      return 0;
    }
  }

  async register(email: string, password: string){

    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    }
    catch(error){
      console.log(error);
      return 0;
    }

  }

  async logout(){
    try{
      await this.afAuth.signOut();
    }
    catch(error){
      console.log(error);
    }
  }

}

