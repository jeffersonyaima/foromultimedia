import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProgramacionRoutingModule } from './programacion-routing.module';
import { ProgramacionComponent } from './programacion.component';


import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DirectivesModule} from '../../directives/directives.module';


@NgModule({
  declarations: [ProgramacionComponent],
  exports:[ProgramacionComponent],
  imports: [
    CommonModule,
    ProgramacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]

})
export class ProgramacionModule { }
