import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {DataTablesModule} from 'angular-datatables';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GroupListComponent} from './UserList/group-list/group-list.component';
import {GroupCreateComponent} from './UserList/group-create/group-create.component';
import {GroupUpdateComponent} from './UserList/group-update/group-update.component';
import {GroupDetailComponent} from './UserList/group-detail/group-detail.component';
import {UserListComponent} from './UserList/user-list/user-list.component';
import {UserDetailComponent} from './UserList/user-detail/user-detail.component';
import {UserUpdateComponent} from './UserList/user-update/user-update.component';
import {UserCreateComponent} from './UserList/user-create/user-create.component';
import {TopBarComponent} from './UserList/top-bar/top-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './Authentication/login/login.component';
import {MonthViewComponent} from './Calendar/month-view/month-view.component';
import {DayViewComponent} from './Calendar/day-view/day-view.component';
import {RegisterComponent} from './Authentication/register/register.component';
import {PasswordForgottenComponent} from './Authentication/password-forgotten/password-forgotten.component';
import {ChangePasswordComponent} from './Authentication/change-password/change-password.component';
import {ActivateUserComponent} from './Authentication/active-user/active-user.component';
import {EmailListComponent} from './Authentication/email-list/email-list.component';
import {EmailDetailComponent} from './Authentication/email-detail/email-detail.component';
import {ProfileComponent} from './Authentication/profile/profile.component';
import {PageNotFoundComponent} from './Authentication/page-not-found/page-not-found.component';
import { TokenInterceptor } from './Authentication/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupCreateComponent,
    GroupUpdateComponent,
    GroupDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserUpdateComponent,
    UserCreateComponent,
    TopBarComponent,
    LoginComponent,
    MonthViewComponent,
    DayViewComponent,
    RegisterComponent,
    PasswordForgottenComponent,
    ChangePasswordComponent,
    ActivateUserComponent,
    EmailListComponent,
    EmailDetailComponent,
    ProfileComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
