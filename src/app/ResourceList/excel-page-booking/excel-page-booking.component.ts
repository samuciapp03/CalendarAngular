import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExcelBookingServiceService } from "src/app/excel-booking-service.service";
import { importlog } from "../interfaces/importlog";
import { RestResponse } from "../interfaces/response";


@Component({
  selector: 'app-excel-page-booking',
  templateUrl: './excel-page-booking.component.html',
  styleUrls: ['./excel-page-booking.component.css']
})
export class ExcelPageBookingComponent {
  list: Array<importlog> = new Array();
  file: any;

  constructor(private http: HttpClient, private service: ExcelBookingServiceService, private router: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.service.getImportLogBooking().subscribe((response) => {

      let responseList = (response as RestResponse<importlog>);

      responseList.data.importlog?.forEach((item: importlog) => {

        this.list.push({
          id: item.id,
          creationTime: item.creationTime,
          undoCode: item.undoCode,
          type: item.type
        });

      });
      

    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {

    console.log(this.file);
    this.service.uploadBookingHttp(this.file).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.log("error onUpload")
      }


    });
  }

  deleteLog(undoCode: String) {
    console.log("called delteLog")
    this.service.deleteImportLog(undoCode).subscribe({
      next: (response: any) => {

        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.log("cannot delete Log")
      }
    });
    this.deleteResource(undoCode)
  }
  deleteResource(undoCode: String) {
    console.log(undoCode)
    this.service.deleteAllwithUndoBooking(undoCode).subscribe({
      next: (response: any) => {
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        console.log("cannot delete Booking")
      }


    });
  }
  downloadResource() {

    window.location.href = "http://localhost:8080/administration/api/excel/downloadBooking"
    this.service.downloadBookingHttp().subscribe({

      next: (response: any) => {
        console.log("download done")

      },
      error: (err: HttpErrorResponse) => {
        console.log("cannot download excel file")
      }
    })
  }
}
