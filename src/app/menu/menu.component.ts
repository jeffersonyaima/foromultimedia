import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '.././auth/services/auth.service';

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [AuthService],
})
export class MenuComponent implements OnInit {

  habilitar: boolean = true;

  public user$: Observable<any> = this.authSvc.afAuth.user;

  
  constructor( private authSvc: AuthService, private router:Router) { }


  ngOnInit(){
    (function ($) {
      $(document).ready(function(){
        $("#slide_nav_button").click(function(){
          $('#slide_menu').animate({width:'toggle'},20);
        });
      });
    })(jQuery);

  }

}
