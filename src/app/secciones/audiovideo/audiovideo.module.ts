import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AudiovideoRoutingModule } from './audiovideo-routing.module';
import { AudiovideoComponent } from './audiovideo.component';



@NgModule({
  declarations: [AudiovideoComponent],
  exports:[AudiovideoComponent],
  imports: [
    CommonModule,
    AudiovideoRoutingModule
  ]

})
export class AudiovideoModule { }
