import { CreateHolidaysComponent } from './holidays/create/create-holidays.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { CreateSolicitationComponent } from './solicitation-subsidy/create/create-solicitation.component';
import { SolicitationSubsidyComponent } from './solicitation-subsidy/solicitation-subsidy.component';
import { CreateOrganismComponent } from './organisms/create/create-organism.component';
import { CreateExpenditureComponent } from './expenditures/create/create-expenditure.component';
import { ModifyTransportComponent } from './transports/modify/modify-transport.component';
import { CreateTransportComponent } from './transports/create/create-transport.component';
import { CreateDistributionsComponent } from './distributions/create/create-distributions.component';
import { ModifyDistributionComponent } from './distributions/modify/modify-distribution.component';
import { DistributionsComponent } from './distributions/distributions.component';
import { ModifyCategoryComponent } from './category/modify/modify.component';
import { CreateCategoryComponent } from './category/create/create.component';
import { CategoryComponent } from './category/category.component';
import { PhotoProfileComponent } from './users/photo-profile/photo-profile.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { RolesPermissionsComponent } from './roles/roles-permissions/roles-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { ModifyuserComponent } from './users/modify/modify.component';
import { AuthGuard } from './_guards/auth.guard';
import { CreateuserComponent } from './users/create/create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './manage-password/reset-password/reset-password.component';
import { SettingofuserComponent } from './users/setting/settingofuser.component';
import { TransportsComponent } from './transports/transports.component';
import { ExpendituresComponent } from './expenditures/expenditures.component';
import { UpdateExpenditureComponent } from './expenditures/update/update-expenditure.component';
import { OrganismsComponent } from './organisms/organisms.component';
import { ModifyOrganismComponent } from './organisms/modify/modify-organism.component';
import { ModifyHolidaysComponent } from './holidays/modify/modify-holidays.component';

const routes: Routes = [
  //canActivate : Interface that a class can implement to be a guard deciding if a route can be activated.
  { path: '', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'users', component: UsersComponent, canActivate : [AuthGuard] },
  { path: 'users/create', component: CreateuserComponent, canActivate : [AuthGuard] },
  { path: 'users/:distributionId', component: UsersComponent, canActivate : [AuthGuard] },
  { path: 'users/update/:id', component: ModifyuserComponent, canActivate : [AuthGuard] },
  { path: 'settingUser/:id', component: SettingofuserComponent, canActivate : [AuthGuard] },
  { path: 'photoProfile/:id', component: PhotoProfileComponent, canActivate : [AuthGuard] },

  { path: 'roles', component: RolesComponent, canActivate : [AuthGuard] },
  { path: 'roles/permissions/:id', component: RolesPermissionsComponent, canActivate : [AuthGuard] },
  { path: 'RecuperarContraseña', component: ManagePasswordComponent},
  { path: 'CambiarPassword', component: ResetPasswordComponent},
  { path: 'category', component : CategoryComponent, canActivate : [AuthGuard]},
  { path: 'category/create', component : CreateCategoryComponent},
  { path: 'category/update/:id', component : ModifyCategoryComponent, canActivate : [AuthGuard]},
  { path: 'distribution', component : DistributionsComponent, canActivate : [AuthGuard]},
  { path: 'distribution/create', component : CreateDistributionsComponent, canActivate : [AuthGuard]},
  { path: 'distribution/:organismId', component : DistributionsComponent, canActivate : [AuthGuard]},
  { path: 'distribution/update/:id', component : ModifyDistributionComponent, canActivate : [AuthGuard]},
  { path: 'transport', component : TransportsComponent, canActivate : [AuthGuard]},
  { path: 'transport/create', component : CreateTransportComponent, canActivate : [AuthGuard]},
  { path: 'transport/update/:id', component : ModifyTransportComponent, canActivate : [AuthGuard]},
  { path: 'expenditure', component : ExpendituresComponent, canActivate : [AuthGuard]},
  { path: 'expenditure/create', component : CreateExpenditureComponent, canActivate : [AuthGuard]},
  { path: 'expenditure/update/:id', component : UpdateExpenditureComponent, canActivate : [AuthGuard]},
  { path: 'organism', component : OrganismsComponent, canActivate : [AuthGuard]},
  { path: 'organism/create', component : CreateOrganismComponent, canActivate : [AuthGuard]},
  { path: 'organism/update/:id', component : ModifyOrganismComponent, canActivate : [AuthGuard]},
  { path: 'SolicitationSubsidy', component : SolicitationSubsidyComponent, canActivate : [AuthGuard]},
  { path: 'SolicitationSubsidy/create', component : CreateSolicitationComponent, canActivate : [AuthGuard]},
  { path: 'holidays', component : HolidaysComponent, canActivate : [AuthGuard]},
  { path: 'holidays/create', component : CreateHolidaysComponent, canActivate : [AuthGuard]},
  { path: 'holidays/update/:id', component : ModifyHolidaysComponent, canActivate : [AuthGuard]},
  
  
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
