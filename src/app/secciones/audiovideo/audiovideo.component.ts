import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-audiovideo',
  templateUrl: './audiovideo.component.html',
  styleUrls: ['./audiovideo.component.css']
})
export class AudiovideoComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor( private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
