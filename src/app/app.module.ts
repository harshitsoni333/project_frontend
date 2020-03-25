import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HardcodedAuthenticationService } from './service/hardcoded-authentication.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { FileFormComponent } from './file-form/file-form.component';
import { BankManagementComponent } from './bank-management/bank-management.component';
import { BankFormComponent } from './bank-form/bank-form.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationManagementComponent } from './application-management/application-management.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { UserService } from './service/user.service';
import { UserUpdateComponent } from './user-update/user-update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUpdateComponent } from './file-update/file-update.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { BankUpdateComponent } from './bank-update/bank-update.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { ApplicationUpdateComponent } from './application-update/application-update.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { FileTypeManagementComponent } from './file-type-management/file-type-management.component';
import { FileTypeFormComponent } from './file-type-form/file-type-form.component';
import { FileTypeUpdateComponent } from './file-type-update/file-type-update.component';
import { FileTypeDetailComponent } from './file-type-detail/file-type-detail.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { HttpInterceptorService } from './service/http/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FileManagementComponent,
    FileFormComponent,
    UserManagementComponent,
    UserFormComponent,
    BankManagementComponent,
    BankFormComponent,
    ApplicationManagementComponent,
    ApplicationFormComponent,
    HomeComponent,
    LogoutComponent,
    UserUpdateComponent,
    FileUpdateComponent,
    UserDetailComponent,
    FileDetailComponent,
    BankUpdateComponent,
    BankDetailComponent,
    ApplicationUpdateComponent,
    ApplicationDetailComponent,
    FileTypeManagementComponent,
    FileTypeFormComponent,
    FileTypeUpdateComponent,
    FileTypeDetailComponent,
    ContactManagementComponent,
    ContactFormComponent,
    ContactDetailComponent,
    ContactUpdateComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'user', component: UserManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'user-form', component: UserFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-user/:username', component: UserUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-user/:username', component: UserDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'file', component: FileManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'file-form', component: FileFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-file/:fileCode', component: FileUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-file/:fileCode', component: FileDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'bank', component: BankManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'bank-form', component: BankFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-bank/:bankCode', component: BankUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-bank/:bankCode', component: BankDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'application', component: ApplicationManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'application-form', component: ApplicationFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-application/:applicationCode', component: ApplicationUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-application/:applicationCode', component: ApplicationDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'fileType', component: FileTypeManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'fileType-form', component: FileTypeFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-fileType/:fileTypeCode', component: FileTypeUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-fileType/:fileTypeCode', component: FileTypeDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'contact', component: ContactManagementComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'contact-form', component: ContactFormComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'update-contact/:id', component: ContactUpdateComponent, canActivate:[RouteGuardService]
      },
      {
        path: 'detail-contact/:id', component: ContactDetailComponent, canActivate:[RouteGuardService]
      },
      {
        path:'logout',component:LogoutComponent, canActivate:[RouteGuardService]
      }
    ])
  ],
  providers: [HardcodedAuthenticationService,UserService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
