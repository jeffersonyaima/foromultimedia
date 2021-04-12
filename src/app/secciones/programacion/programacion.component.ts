import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
