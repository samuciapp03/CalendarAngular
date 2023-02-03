import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {DayViewComponent} from './Calendar/day-view/day-view.component'
import {GroupCreateComponent} from './UserList/group-create/group-create.component'
import {GroupDetailComponent} from './UserList/group-detail/group-detail.component'
import {GroupListComponent} from './UserList/group-list/group-list.component'
import {GroupUpdateComponent} from './UserList/group-update/group-update.component'
import {MonthViewComponent} from './Calendar/month-view/month-view.component'
import {UserCreateComponent} from './UserList/user-create/user-create.component'
import {UserDetailComponent} from './UserList/user-detail/user-detail.component'
import {UserListComponent} from './UserList/user-list/user-list.component'
import {UserUpdateComponent} from './UserList/user-update/user-update.component'
import {ExcelPageResourceComponent} from './ResourceList/excel-page-resource/excel-page-resource.component'
import {
  DeleteSlotPrenotazioniComponent
} from './PrenotazioniList/delete-slot-prenotazioni/delete-slot-prenotazioni.component';
import {
  DetailSlotPrenotazioniComponent
} from './PrenotazioniList/detail-slot-prenotazioni/detail-slot-prenotazioni.component';
import {
  ListSlotPrenotazioniComponent
} from './PrenotazioniList/list-slot-prenotazioni/list-slot-prenotazioni.component';
import {
  UpdateSlotPrenotazioniComponent
} from './PrenotazioniList/update-slot-prenotazioni/update-slot-prenotazioni.component';
import {
  CreateSlotPrenotazioniComponent
} from './PrenotazioniList/create-slot-prenotazioni/create-slot-prenotazioni.component';
import {CreateResourceComponent} from './ResourceList/create-resource/create-resource.component';
import {DeleteResourceComponent} from './ResourceList/delete-resource/delete-resource.component';
import {ModifyResourceComponent} from './ResourceList/modify-resource/modify-resource.component';
import {ResourceDetailComponent} from './ResourceList/resource-detail/resource-detail.component';
import {ResourceListComponent} from './ResourceList/resource-list/resource-list.component';
import {ExcelPageBookingComponent} from './ResourceList/excel-page-booking/excel-page-booking.component';
import {LoginComponent} from './Authentication/login/login.component';

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
  { path: 'groups', component: GroupListComponent },
  { path: 'group-detail/:id', component: GroupDetailComponent },
  { path: 'group-update/:id', component: GroupUpdateComponent },
  { path: 'group-create', component: GroupCreateComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'excel-page-resource', component: ExcelPageResourceComponent },
  { path: 'excel-page-booking', component: ExcelPageBookingComponent },
  { path: 'list-slotPrenotazioni', component: ListSlotPrenotazioniComponent },
  { path: 'detail-slotPrenotazioni/:id', component: DetailSlotPrenotazioniComponent },
  { path: 'update-slotPrenotazioni/:id', component: UpdateSlotPrenotazioniComponent },
  { path: 'delete-slotPrenotazioni/:id', component: DeleteSlotPrenotazioniComponent },
  { path: 'create-slotPrenotazioni', component: CreateSlotPrenotazioniComponent },
  { path: 'resource-list', component: ResourceListComponent },
  { path: 'resource-detail/:id', component: ResourceDetailComponent },
  { path: 'create-resource', component: CreateResourceComponent },
  { path: 'modify-resource/:id', component: ModifyResourceComponent },
  { path: 'delete-resource/:id', component: DeleteResourceComponent },
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
