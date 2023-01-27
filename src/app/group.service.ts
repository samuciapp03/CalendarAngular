import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './group';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getAllGroups(): Observable<Object> {
    console.log("auth", this.auth.headers);
    
    return this.httpClient.get('http://localhost:8080/api/groups/', this.auth.headers);
  }

  getGroupById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/groups/' + id, this.auth.headers);
  }

  createGroup(group: Group):Observable<Object> {
    return this.httpClient.post('http://localhost:8080/api/groups/', group, this.auth.headers);
  }

  udpateGroup(group:Group):Observable<Object>{
    return this.httpClient.put('http://localhost:8080/api/groups/'+group.id, group, this.auth.headers);
  }

  deleteGroup(id: number):Observable<Object> {
    return this.httpClient.delete('http://localhost:8080/api/groups/' + id, this.auth.headers);
  }

  getUserQuantity(id: number):Observable<number> {
    return this.httpClient.get<number>('http://localhost:8080/api/groups/' + id + "/usrs_quantity", this.auth.headers);
  }


  groupAviable(value:string, callbackAviable: () => void){

    this.httpClient.get('http://localhost:8080/api/groups?groupname='+value, this.auth.headers).subscribe((response:any) => {
      console.log(response['exists']);

      if(response['exists'] == 'true'){
        console.log('richiamo la funzione di callback')
        callbackAviable();
      }
      
    });
    
  }






}
