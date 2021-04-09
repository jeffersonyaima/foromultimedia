import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimacionComponent } from './animacion.component';

const routes: Routes = [{ path: '', component: AnimacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimacionRoutingModule { }
