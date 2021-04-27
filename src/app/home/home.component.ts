import { Component, OnInit } from '@angular/core';
declare var jQuery: any;



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
    this.imgsrcprogramacion='../../assets/promagramacion.png',
    this.imgsrcrealidad='../../assets/realidad.png'
  }

  
  ngOnInit(): void {

    (function ($) {

      

    })(jQuery);

  }

}
