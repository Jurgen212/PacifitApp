import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { PodiumComponent } from './podium/podium.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PodiumComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  
  exports: [
    NavbarComponent,
    PodiumComponent
  ]
})
export class ComponentsModule { }
