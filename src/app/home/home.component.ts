import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

import { gsap, Elastic } from 'gsap'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgsrc3d : any;
  imgsrc2d : any;
  imgsrcguiones : any;
  imgsrcaudio : any;
  imgsrcprogramacion : any;
  imgsrcrealidad : any;
  constructor() { 
    this.imgsrc3d='../../assets/3D.png', 
    this.imgsrc2d='../../assets/2D.png',
    this.imgsrcguiones='../../assets/guiones2.png',
    this.imgsrcaudio='../../assets/audio.png',
    this.imgsrcprogramacion='../../assets/promagamacion.png',
    this.imgsrcrealidad='../../assets/realidad.png'
  }

  
  ngOnInit(): void {

    (function ($) {

      $(document).ready(function(){
        $("#logo3d").hover(function(){$("#logo3d"),
        gsap.from('#logo3d', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
        function(){$("logo3d"),
        gsap.set('logo3d', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 });
        });});

      $(document).ready(function(){
        $("#logoguiones").hover(function(){$("#logoguiones"),
        gsap.from('#logoguiones', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
        function(){$("logoguiones"),
        gsap.set('logoguiones', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 });
        });});

      $(document).ready(function(){
          $("#logo2d").hover(function(){$("#logo2d"),
          gsap.from('#logo2d', { duration: 3, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
          function(){$("#logo2d"),
          gsap.set('#logo2d', { duration: 3, ease: "elastic.out(2, 0.1)", y: -10 });
          });});  
    
       $(document).ready(function(){
          $("#logoaudio").hover(function(){$("#logoaudio"),
          gsap.from('#logoaudio', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
          function(){$("#logoaudio"),
          gsap.set('#logoaudio', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 });
          });});  
    
       $(document).ready(function(){
          $("#logoprogramacion").hover(function(){$("#logoprogramacion"),
          gsap.from('#logoprogramacion', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
          function(){$("#logoprogramacion"),
          gsap.set('#logoprogramacion', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 });
          });});  
    
       $(document).ready(function(){
          $("#logorealidad").hover(function(){$("#logorealidad"),
          gsap.from('#logorealidad', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 }); }, 
          function(){$("#logorealidad"),
          gsap.set('#logorealidad', { duration: 2, ease: "elastic.out(2, 0.1)", y: -10 });
          });});  

       $(document).ready(function(){
          $("#mostrar").click(function(){
          $('.target').show("swing");
          });
          $("#ocultar").click(function(){
          $('.target').hide("linear");
          });});

    })(jQuery);

  }

}
