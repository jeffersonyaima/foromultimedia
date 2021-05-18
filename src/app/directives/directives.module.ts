import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropzoneDirective} from './dropzone.directive'

import { DirectivesRoutingModule } from './directives-routing.module';
import { DirectivesComponent } from './directives.component';


@NgModule({
  declarations: [DirectivesComponent, DropzoneDirective],
  imports: [CommonModule, DirectivesRoutingModule],
  exports:[DropzoneDirective]
  
})
export class DirectivesModule { }
