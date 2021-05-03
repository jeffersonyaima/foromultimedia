import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { ForoComponent } from './foro.component';
import { ReactiveFormsModule} from '@angular/forms'
import {ForoPipe} from './foro.pipe'


@NgModule({
  declarations: [ForoComponent, ForoPipe],
  imports: [
    CommonModule,
    ForoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForoModule { }
