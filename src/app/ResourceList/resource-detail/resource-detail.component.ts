import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  id: number = 0;
  detail?: Resource;

  constructor(private route: ActivatedRoute, private service: ResourceService, private router: Router){
    this.router = router;
    this.route = route;
    this.service = service;
  }

  ngOnInit(): void {

    const func1 =  ((params: any) => {
      this.id = params['id'];

      this.service.findResourceByIdHttp(this.id).subscribe({
        next: (object: RestResponse<Resource>) => {

          let obj = object.data.resource;
          this.detail = obj;
        },

        error: (error: HttpErrorResponse) => {
          console.log(error);
          alert('')
        }
        
      });
    });

    this.route.params.subscribe(func1);
  }

  back(){
    this.router.navigateByUrl('/resource-list')
  }
}
