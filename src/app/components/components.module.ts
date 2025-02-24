import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './ui/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './ui/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuLateralComponent,
    AlertComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
    HeaderComponent,
    MenuLateralComponent,
    DeleteDialogComponent
  ]
})
export class ComponentsModule { }
