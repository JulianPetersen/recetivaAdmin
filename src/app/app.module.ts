import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ComponentsModule } from './components/components.module';
import { AdminReceetasComponent } from './pages/admin-receetas/admin-receetas.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { CreateRecetaComponent } from './pages/admin-receetas/components/create-receta/create-receta.component';
import { ListRecetasComponent } from './pages/admin-receetas/components/list-recetas/list-recetas.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ReceraSelectedComponent } from './pages/recera-selected/recera-selected.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UpdateRecetaComponent } from './pages/admin-receetas/components/update-receta/update-receta.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormAddUserComponent } from './pages/admin-user/components/form-add-user/form-add-user.component';
import { ListUsersComponent } from './pages/admin-user/components/list-users/list-users.component';
import { EditInfoUserComponent } from './pages/admin-user/components/edit-info-user/edit-info-user.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { RouterModule } from '@angular/router';
import { FormAddCategorieComponent } from './pages/admin-categories/components/form-add-categorie/form-add-categorie.component';
import { ListCategorieComponent } from './pages/admin-categories/components/list-categorie/list-categorie.component';
import { AddIngredientComponent } from './pages/admin-receetas/components/add-ingredient/add-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    AdminReceetasComponent,
    LoginComponent,
    CreateRecetaComponent,
    ListRecetasComponent,
    ReceraSelectedComponent,
    UpdateRecetaComponent,
    AdminUserComponent,
    FormAddUserComponent,
    ListUsersComponent,
    EditInfoUserComponent,
    AdminCategoriesComponent,
    FormAddCategorieComponent,
    ListCategorieComponent,
    AddIngredientComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    QuillModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RouterModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
