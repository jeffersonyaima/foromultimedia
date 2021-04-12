import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.component.html',
  styleUrls: ['./animacion.component.css']
})
export class AnimacionComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
