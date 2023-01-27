import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  usernameString: string = '';
  emailString: string = '';
  list :Array<Group>=new Array();
  selectedGroup = [];

user:User={
  id: 0,
  username: '',
  password: '',
  email: '',
  firstname: '',
  lastname: '',
  groupName: '',
  groupId: '',
  lastLogin: new Date,
  dateModifiedPass: new Date,
  creationTime: new Date,
  verified: false,
  deleted: false,
  creationUser: '',
  updateUser: '',
  updateTime: new Date
}

  constructor(private service:UserService, private actRoute:ActivatedRoute, private router:Router, private groupService:GroupService){

  }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe((response)=>{
  
      let responseList=(response as Array<Group>);
  
      responseList.forEach((g)=>{
  
        console.log("Id del gruppo: "+g.id);
  
        this.list.push({
          id:g.id,
          groupName:g.groupName,
          permissions:g.permissions,
          enabled:g.enabled,
          creationUser:g.creationUser,
          creationTime:new Date(g.creationTime),
          updateUser:g.updateUser,
          updateTime:new Date(g.updateTime),
          roles:g.roles,
          userNumber: 0
        });
  
  
      });
  
  
    });
    
  }

  checkUsername() {
    this.usernameString = '';
    this.service.valueAviable(this.user.username, () => {this.usernameString = 'Username in uso.'}); 
    
    
  }

  checkEmail() {
    this.emailString = '';
    this.service.valueAviable(this.user.email, () => {this.emailString = 'Email in uso.'});
  }


  createUser(){

      this.user.groupId = this.selectedGroup.toString();

      this.service.createUser(this.user).subscribe({
        next:(data)=>{
          this.router.navigateByUrl("/users");
        }, 
        error:(err)=>{
          console.log(err);
        }
      })
    
    }


}
