import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuLateralComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    MenuLateralComponent
  ]
})
export class ComponentsModule { }
