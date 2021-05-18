import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GuionesRoutingModule } from './guiones-routing.module';
import { GuionesComponent } from './guiones.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DirectivesModule} from '../../directives/directives.module';




@NgModule({
  declarations: [GuionesComponent],
  exports:[GuionesComponent],
  imports: [
    CommonModule,
    GuionesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]

})
export class GuionesModule { }





