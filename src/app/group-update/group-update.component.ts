import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.css']
})
export class GroupUpdateComponent implements OnInit {

  warningString: string = '';

  id!:number;
  group: Group = {
    id:0,
    groupName: '',
    permissions: '',
    enabled: false,
    creationUser: '',
    roles: [],
    creationTime: new Date(),
    updateUser: '',
    updateTime: new Date(),
    userNumber:0,
  }

  rolesSelect = [
    { name: 'SUPER_USER' },
    { name: 'ADMIN' },
    { name: 'MODERATOR' },
    { name: 'USER' },
    { name: 'ROLE_CREATE_RISORSE' },
    { name: 'ROLE_READ_RISORSE' },
    { name: 'ROLE_UPDATE_RISORSE' },
    { name: 'ROLE_UPDATE_RISORSE' },
    { name: 'ROLE_CREATE_USER' },
    { name: 'ROLE_READ_USER' },
    { name: 'ROLE_UPDATE_USER' },
    { name: 'ROLE_DELETE_USER' },
    { name: 'ROLE_CREATE_SLOT' },
    { name: 'ROLE_READ_SLOT' },
    { name: 'ROLE_UPDATE_SLOT' },
    { name: 'ROLE_DELETE_SLOT' },
    { name: 'ROLE_CREATE_GROUP' },
    { name: 'ROLE_READ_GROUP' },
    { name: 'ROLE_UPDATE_GROUP' },
    { name: 'ROLE_DELETE_GROUP' }

  ];


  constructor(private service:GroupService, private actRoute:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.id=Number(this.router.url.split('/').pop());

    this.getGroupById(this.id);
    
  }

  getGroupById(id:number){
    this.service.getGroupById(id).subscribe((data)=>{
      this.group=data;
    })

  }

  updateGroup(){
    this.service.udpateGroup(this.group).subscribe({
      next:(data)=>{
        this.router.navigateByUrl("/groups");
      },
      error:(err)=>{
        console.log(err);
      }

    });
  }

  checkGroupname() {
    this.warningString = '';
    this.service.groupAviable(this.group.groupName, () => {this.warningString = 'Nome del gruppo già esistente.'})
  }




}
