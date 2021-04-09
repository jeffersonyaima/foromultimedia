import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuionesComponent } from './guiones.component';

const routes: Routes = [{ path: '', component: GuionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuionesRoutingModule { }