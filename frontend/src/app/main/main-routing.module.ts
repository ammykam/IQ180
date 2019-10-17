import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TimerComponent } from './timer/timer.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'main', component: MainComponent, children: [
      {path:'login', component: LoginComponent}
    ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }