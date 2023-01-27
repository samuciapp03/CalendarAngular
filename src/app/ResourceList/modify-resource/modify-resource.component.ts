import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';
import { InputError } from '../interfaces/inputError';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';

@Component({
  selector: 'app-modify-resource',
  templateUrl: './modify-resource.component.html',
  styleUrls: ['./modify-resource.component.css']
})
export class ModifyResourceComponent {
  id: number = 0;
  detail: Resource = {
    name: '',
    type: '',
    active: false
  };

  resourceError: InputError = {

  }

  constructor(private route: ActivatedRoute, private service: ResourceService, private router: Router){
    this.router = router;
    this.route = route;
    this.service = service;
  }

  ngOnInit(): void {

    const getResource =  ((params: any) => {
      this.id = params['id'];

      this.service.findResourceByIdHttp(this.id).subscribe({
        next: (object: RestResponse<Resource>) => {

          let obj = object.data.resource;
          this.detail = obj!;
        },

        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.router.navigateByUrl('resource-list')
        }
        
      });
    });

    this.route.params.subscribe(getResource);
  }

  back(){
    this.router.navigateByUrl('/resource-list');
  }

  update(){


    if(this.checkValues())
    {
      this.service.updateResourceHttp(this.detail).subscribe({
        next: (resp: RestResponse<Resource>) => {
          console.log('resource updated successfully!');
          this.router.navigateByUrl('resource-list')
        },

        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      });
    }

    console.log('bad input')
  }

  checkValues(): boolean {

    this.detail.name = this.detail.name.trim();
    this.detail.type = this.detail.type.trim();

    if(this.detail.name == ''){
      this.resourceError.rName = '*il nome della risorsa non può essere vuoto';
    } else{
      this.resourceError.rName = '';
    }

    if(this.detail.type == ''){
      this.resourceError.rType = '*il tipo della risorsa non può essere vuoto';
    } else{
      this.resourceError.rType = '';
    }

    if(this.resourceError.rName == '' || this.resourceError.rType == ''){
      return false;
    }
    return true;
}


}
