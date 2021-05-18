import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';


const routes:Routes=[
  { path: '', redirectTo: '/home', pathMatch: 'full',},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'guiones', loadChildren: () => import('./secciones/guiones/guiones.module').then(m => m.GuionesModule) },
  { path: 'animacion', loadChildren: () => import('./secciones/animacion/animacion.module').then(m => m.AnimacionModule) },
  { path: 'aplicacion', loadChildren: () => import('./secciones/aplicacion/aplicacion.module').then(m => m.AplicacionModule) },
  { path: 'programacion', loadChildren: () => import('./secciones/programacion/programacion.module').then(m => m.ProgramacionModule) },
  { path: 'foro', loadChildren: () => import('./secciones/foro/foro.module').then(m => m.ForoModule) },
  { path: 'audiovideo', loadChildren: () => import('./secciones/audiovideo/audiovideo.module').then(m => m.AudiovideoModule) },
  { path: 'usuarios', loadChildren: () => import('./secciones/foro/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'directives', loadChildren: () => import('./directives/directives.module').then(m => m.DirectivesModule) },

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),CommonModule],
    exports:[RouterModule]
})
export class AppRoutingModule { }
