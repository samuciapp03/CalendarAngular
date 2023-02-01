import { Component, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { importlog } from '../interfaces/importlog';
import { RestResponse } from '../interfaces/response';
import { ExcelResourceServiceService } from 'src/app/excel-resource-service.service';


@Component({
  selector: 'app-excel-page-resource',
  templateUrl: './excel-page-resource.component.html',
  styleUrls: ['./excel-page-resource.component.css']
})

export class ExcelPageResourceComponent {
  list: Array<importlog>= new Array();
  file: any;
  @Input() visible = false;

  constructor(private http: HttpClient, private service:ExcelResourceServiceService,private router: ActivatedRoute) {

  }
  ngOnInit(): void{

    this.service.getImportLogResource().subscribe((response)=>{

      let responseList= (response as RestResponse<importlog>);

      responseList.data.importlog?.forEach((item)=>{

        this.list.push({
          id: item.id,
          creationTime: item.creationTime,
          undoCode: item.undoCode,
          type: item.type
        });

      });

    });
  }

  onChange(event:any) {
    this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
  
    console.log(this.file);
    this.service.uploadResourceHttp(this.file).subscribe({
      next:(response:any)=>{
        window.location.reload();
      },
      error:(err:HttpErrorResponse)=>{
        console.log("cannot delete Log")
      }
  
  
    });
}
    
  deleteLog(undoCode:String){
    console.log("called delteLog")
    this.service.deleteImportLog(undoCode).subscribe({
    next:(response:any)=>{
    
    window.location.reload();
    },
    error:(err:HttpErrorResponse)=>{
      console.log("cannot delete Log")
    }
  });
  this.deleteResource(undoCode)
  }
deleteResource(undoCode:String){
console.log(undoCode)
  this.service.deleteAllwithUndoResource(undoCode).subscribe({
    next:(response:any)=>{
      window.location.reload();
    },
    error:(err:HttpErrorResponse)=>{
      console.log("cannot delete Resource")
    }


  });
}
  downloadResource(){
    window.location.href="http://localhost:8080/administration/api/excel/downloadResource"
    this.service.downloadResourceHttp().subscribe({

      next:(response:any)=>{
        console.log("download done")

      },
      error:(err:HttpErrorResponse)=>{
        console.log("cannot download excel file")
      }
    })
  }
}
