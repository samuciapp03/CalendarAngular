import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';
import { Page } from '../interfaces/page';
import { Resource } from '../interfaces/resource';
import { RestResponse } from '../interfaces/response';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {

  currentPage: number = 1;

  page: Page<Resource> = {
    content: [],
    pageSize: 0,
    totalElements: 0,
    totalPages: 0
  }

  selectValue: number = 10;

  constructor(private route: ActivatedRoute, private service: ResourceService, private router: Router){
    
    this.route = route;
    this.router = router;
    this.service = service;
  }

  ngOnInit(): void{

    this.service.findPaginatedResourcesHttp(1, 10).subscribe({
      next: (response : RestResponse<Resource>) => {

        this.page = response.data.page!;

        console.log(this.page)
    },

      error: (errorInfo: HttpErrorResponse) => {
        console.log(errorInfo);
        alert('error loading resources\' list');
      }
    });
  }

  modifyResource(id: number){
    this.router.navigateByUrl("/modify-resource/" + id)
  }

  deleteResource(id: number){
    this.router.navigateByUrl("/delete-resource/" + id)
  }

  viewResource(id: number){
    this.router.navigateByUrl("/resource-detail/" + id)
  }

  createResource(){
    this.router.navigateByUrl("/create-resource")
  }

  changeNumItems(){
    console.log(this.selectValue);
    this.changePage();
  }

  changePage(){
    this.service.findPaginatedResourcesHttp(this.currentPage, this.selectValue).subscribe({
      next: (response: RestResponse<Resource>) => {
      
        this.page = response.data.page!;
    },

    error: (errorInfo: HttpErrorResponse) => {
      console.log(errorInfo);
      alert('error loading resources\' list');
    }
    });
  }

  changePageByNum(num: number){
    this.service.findPaginatedResourcesHttp(num, this.selectValue).subscribe({
      next: (response: RestResponse<Resource>) => {
      
        this.currentPage = num;
        this.page = response.data.page!;
    },

    error: (errorInfo: HttpErrorResponse) => {
      console.log(errorInfo);
      alert('error loading resources\' list');
    }
    });
  }

  firstOrLastPage(pageNumber: number){
    this.service.findPaginatedResourcesHttp(pageNumber, this.selectValue).subscribe({
      next: (response: RestResponse<Resource>) => {
        this.currentPage = pageNumber;
        this.page = response.data.page!;
    },

    error: (errorInfo: HttpErrorResponse) => {
      console.log(errorInfo);
      alert('error loading resources\' list');
    }
    });
  }
  excelPage(){
    this.router.navigateByUrl('excel-page')
  }
}
