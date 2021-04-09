import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-guiones',
  templateUrl: './guiones.component.html',
  styleUrls: ['./guiones.component.css']
})
export class GuionesComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
