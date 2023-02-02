import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from '../interfaces/resource';
import { HttpErrorResponse } from '@angular/common/http';
import { RestResponse } from '../interfaces/response';
import { InputError } from '../interfaces/inputError';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent {

  resource: Resource = {
    name: '',
    type: '',
    active: false
  }

  resourceError: InputError = {

  }

  constructor(private service: ResourceService, private route: ActivatedRoute, private router: Router){
    this.service = service;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void{

  }

  back(){
    this.router.navigateByUrl('resource-list');
  }

  create(){

    if(!this.checkValues()){
      console.log('error creating resource! values inserted are not valid');
      return;
    }

    this.service.createResourceHttp(this.resource).subscribe({
      next: (res: RestResponse<Resource>) => {
        this.router.navigateByUrl('resource-list');
      },

      error: (err: HttpErrorResponse) => {
        console.log(err.message)
      }
    })
  }

  checkValues(): boolean {

      this.resource.name = this.resource.name.trim();
      this.resource.type = this.resource.type.trim();

      if(this.resource.name == ''){
        this.resourceError.rName = '*il nome della risorsa non può essere vuoto';
      } else{
        this.resourceError.rName = '';
      }

      if(this.resource.type == ''){
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


