import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';
import { TimerComponent } from './timer/timer.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule,  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomedialogComponent } from './welcomedialog/welcomedialog.component';

@NgModule({
  declarations: [MainComponent, TimerComponent, LoginComponent, WelcomedialogComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  entryComponents: [
    LoginComponent,
  ]
})
export class MainModule { }
