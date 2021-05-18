import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AnimacionRoutingModule } from './animacion-routing.module';
import { AnimacionComponent } from './animacion.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';


import { DirectivesModule} from '../../directives/directives.module';



@NgModule({
  declarations: [AnimacionComponent],
  exports:[AnimacionComponent],
  imports: [
    CommonModule,
    AnimacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]

})
export class AnimacionModule { }
