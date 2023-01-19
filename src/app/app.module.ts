import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DataTablesModule } from "angular-datatables";
import {MatButtonModule} from '@angular/material/button';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    TopBarComponent
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
    MatButtonModule
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  rolesSelect = [
    { name: 'SUPER_USER' },
    { name: 'ADMIN' },
    { name: 'MODERATOR' },
    { name: 'USER' },

  ];


}
