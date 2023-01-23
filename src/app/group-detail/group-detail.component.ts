import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit{

  id!:number;
  group!:Group;
  usrList:Array<User>=new Array();
  clicked!:boolean;
  notEmpty=true;
  

  constructor(private actRoute:ActivatedRoute, private router:Router, private groupService:GroupService, private userService:UserService){

  }

ngOnInit(): void {
  this.id=Number(this.router.url.split('/').pop());
  console.log(this.id);
 
  
  this.groupService.getGroupById(this.id).subscribe(data=>{
    this.group=data;
  });


}

getUsersOfAGroup(){


  this.userService.getUsersFromAGroup(this.id).subscribe((data)=>{
    console.log("La richiesta è stata ricevuta");
    let responseList=(data as Array<User>);

    if(responseList.length==0){
      this.notEmpty=false;
    }

    responseList.forEach(u => {

      

      this.usrList.push({
        id: u.id,
        username: u.username,
        password: u.password,
        email: u.email,
        name: u.name,
        lastName: u.lastName,
        groupName: u.groupName,
        lastLogin: new Date(u.lastLogin),
        dateModifiedPass: new Date(u.dateModifiedPass),
        deleted: u.deleted,
        verified: u.verified,
        groupId: u.groupId,
        creationTime: u.creationTime,
        creationUser: u.creationUser,
        updateUser: u.updateUser,
        updateTime: new Date(u.updateTime)
      })
      
    });
    

this.clicked=!this.clicked;
if(this.clicked==false){
  this.usrList.splice(0)
}


  })

}



}
