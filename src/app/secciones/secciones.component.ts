import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function ($) {
      $(window).on("load",function(){
        $(".container").css("opacity", 1)
        $("#precarga").delay(2500).fadeOut("slow");
      });
    })(jQuery);
  }

}
