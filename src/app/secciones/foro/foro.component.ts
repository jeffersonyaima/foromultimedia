import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    (function ($) {
      $('.categoria1').click(function(){
        $('.contenedor-preguntas1').show("swing");
      });


    })(jQuery);


  }

}
