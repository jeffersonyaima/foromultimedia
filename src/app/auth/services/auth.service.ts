import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';


@Injectable()

export class AuthService {


  constructor(public afAuth: AngularFireAuth) {}

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

