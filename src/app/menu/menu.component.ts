import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  habilitar: boolean = true;

  constructor() { }




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
