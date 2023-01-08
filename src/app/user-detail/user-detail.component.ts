import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id!:number;
  user!:User;

  constructor(private actRoute:ActivatedRoute, private router:Router, private service:UserService){

  }


  ngOnInit(): void {
    this.id=Number(this.router.url.split('/').pop());
    console.log("Id è: "+this.id);

    this.service.getUserById(this.id).subscribe(data=>{
      this.user=data;
    });

    
  }

}
