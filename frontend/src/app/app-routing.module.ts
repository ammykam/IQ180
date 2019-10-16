import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import 'hammerjs';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main/main.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: WelcomeComponent },
  { path: 'main', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
