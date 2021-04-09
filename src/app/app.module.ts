import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

/*componentes*/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';


import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabaseModule, AngularFireDatabase, AngularFireList} from '@angular/fire/database'

export const firebaseConfig = {
  apiKey: "AIzaSyAKuO8ExX3hnuV9EgxmikNbinnflHAgaQw",
  authDomain: "foromultimedia-8511c.firebaseapp.com",
  databaseURL: "https://foromultimedia-8511c-default-rtdb.firebaseio.com",
  projectId: "foromultimedia-8511c",
  storageBucket: "foromultimedia-8511c.appspot.com",
  messagingSenderId: "558795473823",
  appId: "1:558795473823:web:ac966b71e0622c972533aa"
};


import { GuionesComponent } from './secciones/guiones/guiones.component';
import { GuionesModule } from './secciones/guiones/guiones.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [AppComponent, NavbarComponent,MenuComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    GuionesModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularFirestoreModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]


})
export class AppModule { }
