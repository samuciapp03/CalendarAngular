import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExcelBookingServiceService {
  constructor(private httpClient: HttpClient){

  }
  path: string = "http://localhost:8080/administration/api/excel";


uploadBookingHttp(file:any): Observable<Object>{
  const formData = new FormData(); 

  formData.append("file", file, file.name);
  return this.httpClient.post(this.path + "/uploadBooking",formData)
}

downloadBookingHttp(): Observable<Object>{
  return this.httpClient.get(this.path + "/downloadBooking")
}

getImportLogBooking(): Observable<Object>{
  return this.httpClient.get(this.path + "/ImportLogBooking")
}
deleteImportLog(undoCode:String): Observable<Object>{
  return this.httpClient.delete(this.path + "/deleteLog/"+undoCode)
}
deleteAllwithUndoBooking(undoCode:String): Observable<Object>{
  return this.httpClient.delete(this.path + "/deleteBooking/"+undoCode)
}
}
