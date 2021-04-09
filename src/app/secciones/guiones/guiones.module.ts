import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GuionesRoutingModule } from './guiones-routing.module';
import { GuionesComponent } from './guiones.component';



@NgModule({
  declarations: [GuionesComponent],
  exports:[GuionesComponent],
  imports: [
    CommonModule,
    GuionesRoutingModule
  ]
  
})
export class GuionesModule { }





