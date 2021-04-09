import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesComponent } from './secciones.component';
import { GuionesComponent } from './guiones/guiones.component';
import { AnimacionComponent } from './animacion/animacion.component';

import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { ForoComponent } from './foro/foro.component';
import { AudioComponent } from './audio/audio.component';
import { AudiovideoComponent } from './audiovideo/audiovideo.component';



@NgModule({
  declarations: [SeccionesComponent,
     GuionesComponent,
     AnimacionComponent,
     AplicacionComponent,
     ProgramacionComponent,
     ForoComponent,
     AudioComponent,
     AudiovideoComponent],
  imports: [
    CommonModule
  ]
})
export class SeccionesModule { }
