import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelResourceServiceService {
  constructor(private httpClient: HttpClient){

  }
  path: string = "http://localhost:8080/administration/api/excel";

  uploadResourceHttp(file:any): Observable<Object>{
    const formData = new FormData(); 
 
    formData.append("file", file, file.name);
    return this.httpClient.post(this.path + "/uploadResource",formData)
}
uploadBookingHttp(): Observable<Object>{
  return this.httpClient.post(this.path + "/uploadBooking", File)
}
downloadResourceHttp(): Observable<Object>{
  return this.httpClient.get(this.path + "/downloadResource")
}

getImportLogResource(): Observable<Object>{
  return this.httpClient.get(this.path + "/ImportLogResource")
}
getImportLogBooking(): Observable<Object>{
  return this.httpClient.get(this.path + "/ImportLogBooking")
}
deleteImportLog(undoCode:String): Observable<Object>{
  return this.httpClient.delete(this.path + "/deleteLog/"+undoCode)
}
deleteAllwithUndoResource(undoCode:String): Observable<Object>{
  return this.httpClient.delete(this.path + "/deleteResource/"+undoCode)
}

}
