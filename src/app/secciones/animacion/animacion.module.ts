import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AnimacionRoutingModule } from './animacion-routing.module';
import { AnimacionComponent } from './animacion.component';



@NgModule({
  declarations: [AnimacionComponent],
  exports:[AnimacionComponent],
  imports: [
    CommonModule,
    AnimacionRoutingModule
  ]

})
export class AnimacionModule { }
