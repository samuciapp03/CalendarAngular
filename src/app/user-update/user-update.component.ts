import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{

  usernameString: string = '';
  emailString: string = '';
  list :Array<Group>=new Array();
  id!:number;
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

  constructor(private actRoute:ActivatedRoute, private router:Router, private service:UserService, private groupService:GroupService){

  }


  ngOnInit(): void {

    this.id=Number(this.router.url.split('/').pop());

    this.getUserById(this.id);

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
          roles:g.roles,
          userNumber: 0,
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

  getUserById(id:number){
    this.service.getUserById(id).subscribe((data)=>{
      this.user=data;
    });
  }


  updateUser(){
    this.service.updateUser(this.user).subscribe({
      next:(data)=>{
        this.router.navigateByUrl("/users");
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }









}
