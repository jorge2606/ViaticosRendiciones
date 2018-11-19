import { PhotoProfileComponent } from './users/photo-profile/photo-profile.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { RolesPermissionsComponent } from './roles/roles-permissions/roles-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { ModifyuserComponent } from './users/modifyuser/modifyuser.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateuserComponent } from './users/createuser/createuser.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './manage-password/reset-password/reset-password.component';
import { SettingofuserComponent } from './users/settingofuser/settingofuser.component';

const routes: Routes = [
  //canActivate : Interface that a class can implement to be a guard deciding if a route can be activated.
  { path: '', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'users', component: UsersComponent, canActivate : [AuthGuard] },
  { path: 'users/create', component: CreateuserComponent, canActivate : [AuthGuard] },
  { path: 'update/:id', component: ModifyuserComponent, canActivate : [AuthGuard] },
  { path: 'settingUser/:id', component: SettingofuserComponent, canActivate : [AuthGuard] },
  { path: 'photoProfile/:id', component: PhotoProfileComponent, canActivate : [AuthGuard] },

  { path: 'roles', component: RolesComponent, canActivate : [AuthGuard] },
  { path: 'roles/permissions/:id', component: RolesPermissionsComponent, canActivate : [AuthGuard] },
  { path: 'RecuperarContraseña', component: ManagePasswordComponent},
  { path: 'CambiarPassword', component: ResetPasswordComponent},
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports : [
    RouterModule
  ], 
  imports : [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutesModule { }
