import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { ForoComponent } from './foro.component';
import { ReactiveFormsModule} from '@angular/forms'
import {ForoPipe} from './foro.pipe'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForoComponent, ForoPipe],
  imports: [
    CommonModule,
    ForoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ForoModule { }
