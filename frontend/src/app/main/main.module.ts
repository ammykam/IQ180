import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';
import { TimerComponent } from './timer/timer.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [MainComponent, TimerComponent, LoginComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
