import { AceptOrRefuseComponent } from './solicitation-subsidy/acept-or-refuse/acept-or-refuse.component';
import { AgentComponent } from './solicitation-subsidy/agent/agent.component';
import { AgentsAndSupervisorsComponent } from './users/agents-and-supervisors/agents-and-supervisors.component';
import { SolicitationSubsidydetailComponent } from './solicitation-subsidy/detail/solicitation-subsidydetail.component';
import { ExpendituresUsersComponent } from './expenditures-users/expenditures-users.component';
import { CreateHolidaysComponent } from './holidays/create/create-holidays.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { CreateSolicitationComponent } from './solicitation-subsidy/create/create-solicitation.component';
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
import { PrintComponent } from './solicitation-subsidy/print/print.component';
import { SupervisorComponent } from './solicitation-subsidy/supervisor/supervisor.component';
import { RepaymentComponent } from './solicitation-subsidy/repayment/repayment.component';

const routes: Routes = [
  //canActivate : Interface that a class can implement to be a guard deciding if a route can be activated.
  { path: '', data: {breadcrumb: 'inicio',isHome: true,show: true, },component: HomeComponent, canActivate : [AuthGuard] },

  { path: 'login', component: LoginComponent },

  { path: 'users',
    data: {breadcrumb: 'usuarios',isHome: false,show: true},
    children: [ 
      { path : '',
        component: UsersComponent, canActivate : [AuthGuard]
      },
      { path: 'create',
        component: CreateuserComponent, canActivate : [AuthGuard],
        data: {
          breadcrumb: 'crear',
          isHome: false,
          show: true
        } 
      },
      { path: 'AgentsAndSupervisors', data: {breadcrumb: 'agentes y supervisores',isHome: false,show: true},component: AgentsAndSupervisorsComponent, canActivate : [AuthGuard] 
      },
      { path: 'update/:id',
        data: {
          breadcrumb: 'modificar',
          isHome: false,
          show: true
        }, component: ModifyuserComponent, canActivate : [AuthGuard] 
      },
      { path: ':distributionId', 
        data: {breadcrumb: 'usuarios y reparticiones',isHome: false,show: true},component: UsersComponent, canActivate : [AuthGuard] 
      }
    ]
  },

  { path: 'settingUser/:id', data: {breadcrumb: 'mi perfil',isHome: false,show: true},component: SettingofuserComponent, canActivate : [AuthGuard] },
  { path: 'photoProfile/:id', component: PhotoProfileComponent, canActivate : [AuthGuard] },

  { path: 'roles',
    data: {breadcrumb: 'roles',isHome: false,show: true}, 
    children : [
      { path : '', component: RolesComponent, canActivate : [AuthGuard] },
      { path: 'permissions/:id',data: {breadcrumb: 'roles permisos',isHome: false,show: true}, component: RolesPermissionsComponent, canActivate : [AuthGuard] },  
    ],
  },
  
  { path: 'RecuperarContraseña', component: ManagePasswordComponent},
  { path: 'CambiarPassword', component: ResetPasswordComponent},

  { path: 'category',
    data: {breadcrumb: 'categoría',isHome: false,show: true},  
    children : [
      {path : '',
        component : CategoryComponent, canActivate : [AuthGuard]
      },
      { path: 'create', 
        data: {breadcrumb: 'crear',isHome: false,show: true},
        component : CreateCategoryComponent, canActivate : [AuthGuard]},
      { path: 'update/:id', 
        data: {breadcrumb: 'modificar',isHome: false,show: true},
        component : ModifyCategoryComponent, canActivate : [AuthGuard]},
    ]
    
  },
  
  { path: 'distribution',
    data: {breadcrumb: 'repartición',isHome: false,show: true},  
    children : [
      {path : '', component : DistributionsComponent, canActivate : [AuthGuard]},
      { path: 'create', component : CreateDistributionsComponent, data: {breadcrumb: 'crear',isHome: false,show: true}, canActivate : [AuthGuard]},
      { path: 'update/:id', data: {breadcrumb: 'modificar',isHome: false,show: true}, component : ModifyDistributionComponent, canActivate : [AuthGuard]},
    ]
  },

  { path: 'transport',
    data: {breadcrumb: 'transporte',isHome: false,show: true},
    children : [
      { path: '', component : TransportsComponent, canActivate : [AuthGuard]},
      { path: 'create', data: {breadcrumb: 'crear',isHome: false,show: true}, component : CreateTransportComponent, canActivate : [AuthGuard]},
      { path: 'update/:id', data: {breadcrumb: 'modificar',isHome: false,show: true}, component : ModifyTransportComponent, canActivate : [AuthGuard]},
    ]
  },
    

  { path: 'expenditure',
    data: {breadcrumb: 'conceptos de gastos',isHome: false,show: true},
    children : [
      { path : '',component : ExpendituresComponent, canActivate : [AuthGuard]},
      { path: 'create', data: {breadcrumb: 'crear', isHome: false,show: true}, component : CreateExpenditureComponent, canActivate : [AuthGuard]},
      { path: 'update/:id',  data: {breadcrumb: 'modificar', isHome: false,show: true}, component : UpdateExpenditureComponent, canActivate : [AuthGuard]},
      { path: ':id',  data: {breadcrumb: 'concepto de gastos usuarios', isHome: false,show: true}, component : ExpendituresUsersComponent, canActivate : [AuthGuard]},
    ]
  },

  { path: 'organism',
    data: {breadcrumb: 'Organismos',isHome: false,show: true},
    children : [
      { path : '',component : OrganismsComponent, canActivate : [AuthGuard]},
      { path: 'distributions/:organismId', data: {breadcrumb: 'organismos y reparticiones',isHome: false,show: true}, component : DistributionsComponent, canActivate : [AuthGuard]},
      { path: 'create', data: {breadcrumb: 'crear',isHome: false,show: true}, component : CreateOrganismComponent, canActivate : [AuthGuard]},
      { path: 'update/:id',data: {breadcrumb: 'modificar',isHome: false,show: true}, component : ModifyOrganismComponent, canActivate : [AuthGuard]},
    ],
  },

  { path: 'SolicitationSubsidy/agent',
    data: {breadcrumb: 'mis solicitudes de viático',isHome: false,show: true},
    children : [
      { path: '', component : AgentComponent, canActivate : [AuthGuard]},
      { path: 'supervisor', data: {breadcrumb: 'solicitud de viático de agentes a mi cargo',isHome: false,show: true}, component : SupervisorComponent, canActivate : [AuthGuard]},      
      { path: 'create',data: {breadcrumb: 'crear',isHome: false,show: true}, component : CreateSolicitationComponent, canActivate : [AuthGuard]},
      { path: 'detail/:id',data: {breadcrumb: 'detalle',isHome: false,show: true}, component : SolicitationSubsidydetailComponent, canActivate : [AuthGuard]},
      { path: 'modify/:id',data: {breadcrumb: 'modificar',isHome: false,show: true},component : CreateSolicitationComponent, canActivate : [AuthGuard]},
      { path: 'confirm/:id',data: {breadcrumb: 'confirmar',isHome: false,show: true}, component : AceptOrRefuseComponent, canActivate : [AuthGuard]},
      { path: 'print/:id', data: {breadcrumb: 'vista previa',isHome: false,show: true}, component : PrintComponent, canActivate : [AuthGuard]},
      { path: 'repayment',data: {breadcrumb: 'reintegro',isHome: false,show: true}, component : RepaymentComponent, canActivate : [AuthGuard]},
      { path: 'repayment/update/:id',data: {breadcrumb: 'modificar reintegro',isHome: false,show: true}, component : RepaymentComponent, canActivate : [AuthGuard]}  
    ],
  },

  { path: 'holidays',  
    data: {breadcrumb: 'feriados',isHome: false,show: true},
    children : [
      { path : '', component : HolidaysComponent, canActivate : [AuthGuard]} ,
      { path: 'create',data: {breadcrumb: 'crear',isHome: false,show: true}, component : CreateHolidaysComponent, canActivate : [AuthGuard]},
      { path: 'update/:id' ,data: {breadcrumb: 'modificar',isHome: false,show: true}, component : ModifyHolidaysComponent, canActivate : [AuthGuard]},
    ]
  },
  
  
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
