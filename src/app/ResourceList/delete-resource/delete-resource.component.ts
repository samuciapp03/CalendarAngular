import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';

@Component({
  selector: 'app-delete-resource',
  templateUrl: './delete-resource.component.html',
  styleUrls: ['./delete-resource.component.css']
})
export class DeleteResourceComponent{

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

  delete(){
    this.service.deleteResourceByIdHttp(this.id).subscribe({
      next: (response: RestResponse<Resource>) => {
        console.log(response.message);
        this.router.navigateByUrl('/resource-list');
      },

      error: (error: HttpErrorResponse) => {
        console.log('error during resource deletion: ' + error.message)
      }
    }) 
  }

  back(){
    this.router.navigateByUrl('/resource-list')
  }

  
}
