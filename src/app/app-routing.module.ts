import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DayViewComponent} from './Calendar/day-view/day-view.component';
import {GroupCreateComponent} from './UserList/group-create/group-create.component';
import {GroupDetailComponent} from './UserList/group-detail/group-detail.component';
import {GroupListComponent} from './UserList/group-list/group-list.component';
import {GroupUpdateComponent} from './UserList/group-update/group-update.component';
import {LoginComponent} from './login/login.component';
import {MonthViewComponent} from './Calendar/month-view/month-view.component';
import {UserCreateComponent} from './UserList/user-create/user-create.component';
import {UserDetailComponent} from './UserList/user-detail/user-detail.component';
import {UserListComponent} from './UserList/user-list/user-list.component';
import {UserUpdateComponent} from './UserList/user-update/user-update.component';
import {PasswordForgottenComponent} from './Authentication/password-forgotten/password-forgotten.component';
import {ChangePasswordComponent} from './Authentication/change-password/change-password.component';
import {ActivateUserComponent} from './Authentication/active-user/active-user.component';
import {EmailListComponent} from './Authentication/email-list/email-list.component';
import {EmailDetailComponent} from './Authentication/email-detail/email-detail.component';
import {ProfileComponent} from './Authentication/profile/profile.component';
import {PageNotFoundComponent} from './Authentication/page-not-found/page-not-found.component';
import {RegisterComponent } from './Authentication/register/register.component';

let today = new Date();

let month: string =
  'month/' + today.getFullYear() + '/' + String(today.getMonth() + 1);

let day: string =
  'day/' +
  today.getFullYear() +
  '/' +
  String(today.getMonth() + 1) +
  '/' +
  today.getDate();

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // firstComponent?
  {path: 'groups', component: GroupListComponent},
  {path: 'group-detail/:id', component: GroupDetailComponent},
  {path: 'group-update/:id', component: GroupUpdateComponent},
  {path: 'group-create', component: GroupCreateComponent},
  {path: 'users', component: UserListComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'user-update/:id', component: UserUpdateComponent},
  {path: 'user-create', component: UserCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'password-forgotten', component: PasswordForgottenComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'change-password', component: ChangePasswordComponent },
  {path: 'activate-user', component: ActivateUserComponent },
  {path: 'email-list', component: EmailListComponent },
  {path: 'email-detail/:id', component: EmailDetailComponent },
  {path: 'profile', component:ProfileComponent},
  //{path: '**', component: PageNotFoundComponent},
  {
    path: 'month',
    redirectTo: month,
    pathMatch: 'full',
  },
  {
    path: 'day',
    redirectTo: day,
    pathMatch: 'full',
  },
  {
    path: 'month/:year/:month',
    component: MonthViewComponent,
  },
  {
    path: 'day/:year/:month/:day',
    component: DayViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
