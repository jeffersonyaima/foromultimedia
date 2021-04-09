import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudiovideoComponent } from './audiovideo.component';

const routes: Routes = [{ path: '', component: AudiovideoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudiovideoRoutingModule { }
