import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';

import { Subject } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  dtTrigger: Subject<any> = new Subject();

  dtOptions: any = {
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'lastName' },
      { data: 'email' },
      { data: 'username' },
      { data: 'password' },
      { data: 'lastLogin' },
      { data: 'dateModifiedPass'},
      { data: 'groupName' },
      { data: 'verified' },
      { data: 'deleted' },
      {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return 'View';
        }
      }
    ]
  };

  list: Array<User> = new Array();
  
  constructor(private route: ActivatedRoute, private router: Router,  private userService:UserService) {
    
  }

  ngOnInit(): void {

    // this.userService.getAllUsers().subscribe(data => {
      
      
    //   this.list = data;
    //   this.dtTrigger.next(data);

    //   console.log(data);
    //   console.log(this.dtOptions)
      
    // });
    
    this.userService.getAllUsers().subscribe((response) => {
      
      console.log(response)

      let responseList = (response as Array<User>);

      responseList.forEach((u) => {
        
        this.list.push({
      
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
          creationTime:u.creationTime,
          creationUser:u.creationUser,
          updateUser:u.updateUser,
          updateTime:new Date(u.updateTime)
          
        });
        

      });
      this.dtTrigger.next(response);

    });

  }


  createUser() {
    this.router.navigateByUrl("/user-create");

  }

  detail(id: Number) {
    this.router.navigateByUrl("/user-detail/" + id);
  }

  deleteUser(id:number){
    if(confirm("Sei sicuro di voler eliminare l'utente?")){
      
        this.userService.deleteUser(id)
          .subscribe(
            data => {
              console.log(data);
             
              
            },
            error => console.log(error));
      
    }
    location.reload();
  }

  edit(id:Number) {
    this.router.navigateByUrl("/user-update/"+id);
  }


}