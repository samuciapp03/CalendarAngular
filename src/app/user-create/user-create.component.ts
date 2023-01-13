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

  warningString: string = '';
  list :Array<Group>=new Array();
  selectedGroup = [];

user:User={
  id: 0,
  username: '',
  password: '',
  email: '',
  name: '',
  lastName: '',
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
      console.log("Richesta della lista ricevuta");
      console.log(response);
  
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
          roles:g.roles
        });
  
  
      });
  
  
    });
    
  }

  checkUsername() {
    this.warningString = '';
    console.log(this.user.username);
    this.service.usernameAviable(this.user.username, () => {this.warningString = 'Username in uso.'});
    
  }


  createUser(){

      this.warningString=''
      console.log('username exists');

      this.user.groupId = this.selectedGroup.toString();

      this.service.createUser(this.user).subscribe({
        next:(data)=>{
          this.router.navigateByUrl("/users");
        }, 
        error:(err)=>{
          console.log(err);
        }
      })
    
    

      this.warningString = 'Username già in uso.'
    







  }


}
