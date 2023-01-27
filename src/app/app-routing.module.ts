import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {path:'', component:GroupListComponent},
  {path:'groups', component:GroupListComponent},
  {path:'group-detail/:id', component:GroupDetailComponent},
  {path:'group-update/:id', component:GroupUpdateComponent},
  {path:'group-create', component:GroupCreateComponent},
  {path:'users', component:UserListComponent},
  {path:'user-detail/:id', component:UserDetailComponent},
  {path:'user-update/:id', component:UserUpdateComponent},
  {path:'user-create', component:UserCreateComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
