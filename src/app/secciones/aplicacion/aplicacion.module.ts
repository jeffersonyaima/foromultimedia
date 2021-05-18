import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { AplicacionComponent } from './aplicacion.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DirectivesModule} from '../../directives/directives.module';



@NgModule({
  declarations: [AplicacionComponent],
  exports:[AplicacionComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]

})
export class AplicacionModule { }
