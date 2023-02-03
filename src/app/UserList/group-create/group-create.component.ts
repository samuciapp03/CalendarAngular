import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../group.service';
import {Group} from "../../models/group.model";


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  warningString: string = '';

  groupForm: Group = {
    id: 0,
    groupName: '',
    permissions: '',
    enabled: false,
    creationUser: '',
    roles: [],
    creationTime: new Date(),
    updateUser: '',
    updateTime: new Date(),
    userNumber: 0
  }

  constructor(private router: Router, private groupService: GroupService, private service: GroupService) {

  }

  ngOnInit(): void {


  }

  rolesSelect = [
    {name: 'ROLE_SUPER_USER'},
    {name: 'ROLE_ADMIN'},
    {name: 'ROLE_MODERATOR'},
    {name: 'ROLE_USER'},
    {name: 'ROLE_CREATE_RISORSE'},
    {name: 'ROLE_READ_RISORSE'},
    {name: 'ROLE_UPDATE_RISORSE'},
    {name: 'ROLE_UPDATE_RISORSE'},
    {name: 'ROLE_CREATE_USER'},
    {name: 'ROLE_READ_USER'},
    {name: 'ROLE_UPDATE_USER'},
    {name: 'ROLE_DELETE_USER'},
    {name: 'ROLE_CREATE_SLOT'},
    {name: 'ROLE_READ_SLOT'},
    {name: 'ROLE_UPDATE_SLOT'},
    {name: 'ROLE_DELETE_SLOT'},
    {name: 'ROLE_CREATE_GROUP'},
    {name: 'ROLE_READ_GROUP'},
    {name: 'ROLE_UPDATE_GROUP'},
    {name: 'ROLE_DELETE_GROUP'}

  ];


  createGroup() {
    this.service.createGroup(this.groupForm).subscribe({
      next: (data) => {
        this.router.navigateByUrl("/groups");
      },

      error: (err) => {
        console.log(err);
      }
    });

  }

  checkGroupname() {
    this.warningString = '';
    this.groupService.groupAviable(this.groupForm.groupName, () => {
      this.warningString = 'Nome del gruppo già esistente.'
    })
  }


}
