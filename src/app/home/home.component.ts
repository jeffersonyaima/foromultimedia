import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgsrc : any;
  constructor() { this.imgsrc='../../assets/3D.png'}

  ngOnInit(): void {

    (function ($) {

      $(document).ready(function(){
        $("#mostrar").click(function(){
          $('.target').show("swing");
         });
        $("#ocultar").click(function(){
          $('.target').hide("linear");
        });
      });

    })(jQuery);

  }

}
