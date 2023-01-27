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
    {name: 'SUPER_USER'},
    {name: 'ADMIN'},
    {name: 'MODERATOR'},
    {name: 'USER'},
    {name: 'CREATE_RISORSE'},
    {name: 'READ_RISORSE'},
    {name: 'UPDATE_RISORSE'},
    {name: 'UPDATE_RISORSE'},
    {name: 'CREATE_USER'},
    {name: 'READ_USER'},
    {name: 'UPDATE_USER'},
    {name: 'DELETE_USER'},
    {name: 'CREATE_SLOT'},
    {name: 'READ_SLOT'},
    {name: 'UPDATE_SLOT'},
    {name: 'DELETE_SLOT'},
    {name: 'CREATE_GROUP'},
    {name: 'READ_GROUP'},
    {name: 'UPDATE_GROUP'},
    {name: 'DELETE_GROUP'}

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
