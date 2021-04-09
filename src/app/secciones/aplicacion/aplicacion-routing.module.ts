import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './aplicacion.component';

const routes: Routes = [{ path: '', component: AplicacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule { }
