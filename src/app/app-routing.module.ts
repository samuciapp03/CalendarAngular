import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DayViewComponent } from './Calendar/day-view/day-view.component'
import { GroupCreateComponent } from './UserList/group-create/group-create.component'
import { GroupDetailComponent } from './UserList/group-detail/group-detail.component'
import { GroupListComponent } from './UserList/group-list/group-list.component'
import { GroupUpdateComponent } from './UserList/group-update/group-update.component'
import { MonthViewComponent } from './Calendar/month-view/month-view.component'
import { UserCreateComponent } from './UserList/user-create/user-create.component'
import { UserDetailComponent } from './UserList/user-detail/user-detail.component'
import { UserListComponent } from './UserList/user-list/user-list.component'
import { UserUpdateComponent } from './UserList/user-update/user-update.component'
import { ExcelPageResourceComponent } from './ResourceList/excel-page-resource/excel-page-resource.component'
import { LoginComponent } from './Authentication/login/login.component'
import { PasswordForgottenComponent } from './Authentication/password-forgotten/password-forgotten.component'
import { ChangePasswordComponent } from './Authentication/change-password/change-password.component'
import { ActivateUserComponent } from './Authentication/active-user/active-user.component'
import { EmailListComponent } from './Authentication/email-list/email-list.component'
import { EmailDetailComponent } from './Authentication/email-detail/email-detail.component'
import { ProfileComponent } from './Authentication/profile/profile.component'
import { RegisterComponent } from './Authentication/register/register.component'
import { AdminGuard } from './Authentication/admin.guard'
import { UserGuard } from './Authentication/user.guard'

let today = new Date()

let month: string =
  'month/' + today.getFullYear() + '/' + String(today.getMonth() + 1)

let day: string =
  'day/' +
  today.getFullYear() +
  '/' +
  String(today.getMonth() + 1) +
  '/' +
  today.getDate()

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // firstComponent?
  { path: 'groups', component: GroupListComponent, canActivate: [AdminGuard] },
  { path: 'group-detail/:id', component: GroupDetailComponent, canActivate: [AdminGuard] },
  { path: 'group-update/:id', component: GroupUpdateComponent, canActivate: [AdminGuard] },
  { path: 'group-create', component: GroupCreateComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AdminGuard] },
  { path: 'user-update/:id', component: UserUpdateComponent, canActivate: [AdminGuard] },
  { path: 'user-create', component: UserCreateComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'password-forgotten', component: PasswordForgottenComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'activate-user', component: ActivateUserComponent },
  { path: 'email-list', component: EmailListComponent, canActivate: [AdminGuard] },
  { path: 'email-detail/:id', component: EmailDetailComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] },
  { path: 'excel-page-resource', component: ExcelPageResourceComponent },
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
