import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminReceetasComponent } from './pages/admin-receetas/admin-receetas.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import path from 'path';
import { ReceraSelectedComponent } from './pages/recera-selected/recera-selected.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"admin", component:AdminComponent, canActivate:[authGuard]},
  {path:"recetas", component:AdminReceetasComponent,canActivate:[authGuard]},
  {path:"login", component:LoginComponent},
  {path: "recetaselected", component:ReceraSelectedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
