import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { AplicacionComponent } from './aplicacion.component';



@NgModule({
  declarations: [AplicacionComponent],
  exports:[AplicacionComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule
  ]

})
export class AplicacionModule { }
