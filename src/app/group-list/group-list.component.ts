import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  list: Array<Group> = new Array();

  dtTrigger: Subject<any> = new Subject();

  dtOptions: any = {
    columns: [
      { data: 'id' },
      { data: 'groupName' },
      { data: 'permissions' },
      { data: 'roles' },
      { data: 'enabled' },
      { data: 'creationUser' },
      { data: 'creationTime' },
      { data: 'updateUser' },
      { data: 'updateTime' },
      {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return 'View';
        }
      }
    ]
  };



  constructor(private actRoute: ActivatedRoute, private router: Router, private service: GroupService) {

  }


  ngOnInit(): void {

this.refreshList(true);



  }

  refreshList(trigger: boolean) {
    this.service.getAllGroups().subscribe((response) => {
      console.log("Richesta della lista ricevuta");


      let responseList = (response as Array<Group>);

      console.log("Lista prima splice e': " + this.list.length);
      this.list.splice(0, this.list.length);
      console.log("Lista dopo splice e': " + this.list.length);

      responseList.forEach((g) => {



        this.list.push({
          id: g.id,
          groupName: g.groupName,
          permissions: g.permissions,
          enabled: g.enabled,
          creationUser: g.creationUser,
          creationTime: new Date(g.creationTime),
          updateUser: g.updateUser,
          updateTime: new Date(g.updateTime),
          roles: g.roles

        });


      });

      console.log('lista dopo push ' + this.list.length);

      if (trigger) {
        this.dtTrigger.next(response);
      }

    });

  }


  groupCreate() {
    this.router.navigateByUrl("/group-create");
  }

  groupDetail(id: number) {
    this.router.navigateByUrl("/group-detail/" + id);
  }

  groupUpdate(id: number) {
    this.router.navigateByUrl("/group-update/" + id);
  }


  deleteGroup(id: number) {
    if (confirm("Sei sicuro di voler eliminare il gruppo?")) {
      this.service.deleteGroup(id)
        .subscribe({

          next: (data) => {
            console.log("Data:", data);

            this.refreshList(false);

          },
          error: error => {
            console.log(error); 
          }
      });      

    }

  }


}