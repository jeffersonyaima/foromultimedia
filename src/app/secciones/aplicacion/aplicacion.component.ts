import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.css']
})
export class AplicacionComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
