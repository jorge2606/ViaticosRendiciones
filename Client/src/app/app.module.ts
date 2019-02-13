import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateuserComponent } from './users/create/create.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AppRoutesModule } from './app-routes.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ModifyuserComponent } from './users/modify/modify.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule, NgbDatepickerModule, NgbDateParserFormatter, NgbAlertModule, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modals/modals.component';
//Paginator
import {NgxPaginationModule} from 'ngx-pagination';
import { NavarComponent } from './navar/navar.component';
import { RolesComponent } from './roles/roles.component';
import { CreateRolesComponent } from './roles/create/create.component';
import { TreeviewModule } from 'ngx-treeview';
import { RolesPermissionsComponent } from './roles/roles-permissions/roles-permissions.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { ResetPasswordComponent } from './manage-password/reset-password/reset-password.component';
import { SettingofuserComponent } from './users/setting/settingofuser.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PhotoProfileComponent } from './users/photo-profile/photo-profile.component';
import { ListNotificationsComponent } from './modals/list-notifications/list-notifications.component';
import { AuditsComponent } from './audits/audits.component';
import { AuditUsersComponent } from './audits/audit-users/audit-users.component';
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './category/create/create.component';
import { ModifyCategoryComponent } from './category/modify/modify.component';
import { DistributionsComponent } from './distributions/distributions.component';
import { ModifyDistributionComponent } from './distributions/modify/modify-distribution.component';
import { CreateDistributionsComponent } from './distributions/create/create-distributions.component';
import { TransportsComponent } from './transports/transports.component';
import { CreateTransportComponent } from './transports/create/create-transport.component';
import { ModifyTransportComponent } from './transports/modify/modify-transport.component';
import { ExpendituresComponent } from './expenditures/expenditures.component';
import { CreateExpenditureComponent } from './expenditures/create/create-expenditure.component';
import { UpdateExpenditureComponent } from './expenditures/update/update-expenditure.component';
import { OrganismsComponent } from './organisms/organisms.component';
import { CreateOrganismComponent } from './organisms/create/create-organism.component';
import { ModifyOrganismComponent } from './organisms/modify/modify-organism.component';
import { CreateSolicitationComponent } from './solicitation-subsidy/create/create-solicitation.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { CreateHolidaysComponent } from './holidays/create/create-holidays.component';
import { ModifyHolidaysComponent } from './holidays/modify/modify-holidays.component';
import { AddNewExpenditureComponent } from './modals/add-new-expenditure/add-new-expenditure.component';
import { AddDestinyComponent } from './modals/add-destiny/add-destiny.component';
import { ExpendituresUsersComponent } from './expenditures-users/expenditures-users.component';
import { SolicitationSubsidydetailComponent } from './solicitation-subsidy/detail/solicitation-subsidydetail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddSupervisorComponent } from './modals/add-supervisor/add-supervisor.component';
import { AgentsAndSupervisorsComponent } from './users/agents-and-supervisors/agents-and-supervisors.component';
import { NotifyRejectComponent } from './modals/notify-reject/notify-reject.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { PrintComponent } from './solicitation-subsidy/print/print.component';
import { SupervisorComponent } from './solicitation-subsidy/supervisor/supervisor.component';
import { AgentComponent } from './solicitation-subsidy/agent/agent.component';
import { AceptOrRefuseComponent } from './solicitation-subsidy/acept-or-refuse/acept-or-refuse.component';
import { HolographSignComponent } from './users/holograph-sign/holograph-sign.component';
import { FileNumberComponent } from './modals/file-number/file-number.component';
import { SelectorDirective } from './directives/selector.directive';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgbDateFRParserFormatter } from './holidays/ngb-parseFormatter';
import { AlertComponent } from './alert/alert.component';

library.add(fas);


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      UsersComponent,
      CreateuserComponent,
      HomeComponent,
      ModifyuserComponent,
      RegisterComponent,
      NgbdModalContent,
      NavarComponent,
      RolesComponent,
      CreateRolesComponent,
      RolesPermissionsComponent,
      ManagePasswordComponent,
      ResetPasswordComponent,
      SettingofuserComponent,
      PhotoProfileComponent,
      ListNotificationsComponent,
      AuditsComponent,
      AuditUsersComponent,
      CategoryComponent,
      CreateCategoryComponent,
      ModifyCategoryComponent,
      DistributionsComponent,
      ModifyDistributionComponent,
      CreateDistributionsComponent,
      TransportsComponent,
      CreateTransportComponent,
      ModifyTransportComponent,
      ExpendituresComponent,
      CreateExpenditureComponent,
      UpdateExpenditureComponent,
      OrganismsComponent,
      CreateOrganismComponent,
      ModifyOrganismComponent,
      CreateSolicitationComponent,
      HolidaysComponent,
      CreateHolidaysComponent,
      ModifyHolidaysComponent,
      AddNewExpenditureComponent,
      AddDestinyComponent,
      ExpendituresUsersComponent,
      SolicitationSubsidydetailComponent,
      AddSupervisorComponent,
      AgentsAndSupervisorsComponent,
      NotifyRejectComponent,
      PrintComponent,
      SupervisorComponent,
      AgentComponent,
      AceptOrRefuseComponent,
      HolographSignComponent,
      FileNumberComponent,
      SelectorDirective,
      AlertComponent
   ],
   imports: [
      BrowserModule,
      AppRoutesModule,
      HttpModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      NgbModule,
      NgxPaginationModule,
      NgbDatepickerModule,
      FontAwesomeModule,
      TreeviewModule.forRoot(),
      FileUploadModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      SelectDropDownModule,
      NgbAlertModule
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
      Title 
    ],
   entryComponents: [
      NgbdModalContent,
      ListNotificationsComponent,
      AddNewExpenditureComponent,
      AddDestinyComponent,
      AddSupervisorComponent,
      SolicitationSubsidydetailComponent,
      NotifyRejectComponent,
      FileNumberComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
