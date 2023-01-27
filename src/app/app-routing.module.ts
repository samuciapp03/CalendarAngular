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
  {path: '', redirectTo: 'month', pathMatch: 'full'},
  {path: 'groups', component: GroupListComponent},
  {path: 'group-detail/:id', component: GroupDetailComponent},
  {path: 'group-update/:id', component: GroupUpdateComponent},
  {path: 'group-create', component: GroupCreateComponent},
  {path: 'users', component: UserListComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'user-update/:id', component: UserUpdateComponent},
  {path: 'user-create', component: UserCreateComponent},
  {path: 'login', component: LoginComponent},
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
