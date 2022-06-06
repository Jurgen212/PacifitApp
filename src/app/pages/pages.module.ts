import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';






@NgModule({
  declarations: [
    MainComponent   ,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
