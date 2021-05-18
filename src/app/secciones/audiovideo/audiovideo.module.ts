import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AudiovideoRoutingModule } from './audiovideo-routing.module';
import { AudiovideoComponent } from './audiovideo.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DirectivesModule} from '../../directives/directives.module';




@NgModule({
  declarations: [AudiovideoComponent],
  exports:[AudiovideoComponent],
  imports: [
    CommonModule,
    AudiovideoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]

})
export class AudiovideoModule { }
