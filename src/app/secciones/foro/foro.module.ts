import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { ForoComponent } from './foro.component';
import { ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [ForoComponent],
  imports: [
    CommonModule,
    ForoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForoModule { }
