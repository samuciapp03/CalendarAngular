import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTableDirective} from 'angular-datatables';

import {Subject} from 'rxjs';
import {User} from '../../user';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();


  dtOptions: any = {
    columns: [
      {data: 'id'},
      {data: 'name'},
      {data: 'lastName'},
      {data: 'email'},
      {data: 'username'},
      {data: 'password'},
      {data: 'lastLogin'},
      {data: 'dateModifiedPass'},
      {data: 'groupName'},
      {data: 'verified'},
      {data: 'deleted'},
      {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return 'View';
        }
      }
    ]
  };

  list: Array<User> = new Array();

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {

    this.refreshList(true);


  }

  restartTable() {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

      this.userService.getAllUsers().subscribe((response) => {
        this.dtTrigger.next(response);
      });

    });

  }

  refreshList(trigger: boolean) {

    this.userService.getAllUsers().subscribe((response) => {

      console.log(response)

      let responseList = (response as Array<User>);

      this.list.splice(0);

      responseList.forEach((u) => {

        this.list.push({

          id: u.id,
          username: u.username,
          password: u.password,
          email: u.email,
          firstname: u.firstname,
          lastname: u.lastname,
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

        });


      });
      if (trigger) {
        this.dtTrigger.next(response);
      } else {
        this.restartTable();
      }


    });

  }


  createUser() {
    this.router.navigateByUrl("/user-create");

  }

  detail(id: Number) {
    this.router.navigateByUrl("/user-detail/" + id);
  }

  deleteUser(id: number) {
    if (confirm("Sei sicuro di voler eliminare l'utente?")) {

      this.userService.deleteUser(id)
        .subscribe({

          next: (data) => {
            console.log(data);

            this.refreshList(false);
          },

          error: (error) => {
            console.log(error)
          }
        });

    }

  }

  edit(id: Number) {
    this.router.navigateByUrl("/user-update/" + id);
  }


}
