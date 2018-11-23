import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateuserComponent } from './users/create/create.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AppRoutesModule } from './app-routes.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor , ErrorInterceptor} from './_helpers/';
import { ModifyuserComponent } from './users/modify/modify.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
    FontAwesomeModule,
    TreeviewModule.forRoot(),
    FileUploadModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    //fakeBackendProvider    
  ],
  entryComponents: [NgbdModalContent, ListNotificationsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
