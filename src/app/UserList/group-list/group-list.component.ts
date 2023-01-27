import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {GroupService} from '../../group.service';
import {DataTableDirective} from 'angular-datatables';
import {AuthService} from '../../auth.service';
import {Group} from "../../models/group.model";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  userCount: number = 0;
  list: Array<Group> = new Array();


  dtTrigger: Subject<any> = new Subject();

  dtOptions: any = {
    columns: [
      {data: 'id'},
      {data: 'groupName'},
      {data: 'permissions'},
      {data: 'roles'},
      {data: 'enabled'},
      {data: 'creationUser'},
      {data: 'creationTime'},
      {data: 'updateUser'},
      {data: 'updateTime'},
      {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return 'View';
        }
      }
    ]
  };


  constructor(private actRoute: ActivatedRoute, private router: Router, private service: GroupService, private auth: AuthService) {

  }


  ngOnInit(): void {

    this.refreshList(true);

  }

  restartTable() {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.service.getAllGroups().subscribe((response) => {
        this.dtTrigger.next(response);
      });

    });

  }

  refreshList(trigger: boolean) {
    this.service.getAllGroups().subscribe((response) => {

      this.list.splice(0, this.list.length);
      console.log("Richiesta della lista ricevuta");
      let responseList = (response as Array<Group>);


      responseList.forEach((g) => {
        this.service.getUserQuantity(g.id).subscribe(count => {
          this.userCount = count;
          this.list.push({
            id: g.id,
            groupName: g.groupName,
            permissions: g.permissions,
            enabled: g.enabled,
            creationUser: g.creationUser,
            creationTime: new Date(g.creationTime),
            updateUser: g.updateUser,
            updateTime: new Date(g.updateTime),
            roles: g.roles,
            userNumber: this.userCount,
          });

          if (this.list.length === responseList.length) {
            if (trigger) {
              this.dtTrigger.next(this.list);
            } else {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next(this.list);
              });
            }
          }

        });
      });

      console.log('lista dopo push ' + this.list.length);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
            this.list = this.list.filter(g => g.id !== id);
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.draw();
            });
          },
          error: error => {
            console.log(error);
          }
        });
    }
  }


}
