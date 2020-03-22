//imports necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

// Importar componentes
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { from } from 'rxjs';
import {IdentityGuard} from './services/identity.guard';

//definir rutas
const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'inicio', component:HomeComponent},
    {path: 'crear-categoria', component:CategoryNewComponent , canActivate: [IdentityGuard]},
    {path: 'categoria/:id', component:CategoryDetailComponent},
    {path: 'crear-entrada', component:PostNewComponent , canActivate: [IdentityGuard]},
    {path: 'entrada/:id', component:PostDetailComponent},
    {path: 'editar-entrada/:id', component:PostEditComponent , canActivate: [IdentityGuard]}, 
    {path: 'perfil/:id', component:ProfileComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'ajustes', component:UserEditComponent, canActivate: [IdentityGuard]},
    {path: '**', component:ErrorComponent},
];

//definir configuracion
export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);