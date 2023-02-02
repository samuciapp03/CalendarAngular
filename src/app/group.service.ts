import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Group} from "./models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }

  getAllGroups(): Observable<Object> {
    console.log("auth");

    return this.httpClient.get('http://localhost:8080/api/groups/');
  }

  getGroupById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/groups/' + id);
  }

  createGroup(group: Group): Observable<Object> {
    return this.httpClient.post('http://localhost:8080/api/groups/', group);
  }

  udpateGroup(group: Group): Observable<Object> {
    return this.httpClient.put('http://localhost:8080/api/groups/' + group.id, group);
  }

  deleteGroup(id: number): Observable<Object> {
    return this.httpClient.delete('http://localhost:8080/api/groups/' + id);
  }

  getUserQuantity(id: number): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8080/api/groups/' + id + "/usrs_quantity");
  }


  groupAviable(value: string, callbackAviable: () => void) {

    this.httpClient.get('http://localhost:8080/api/groups?groupname=' + value).subscribe((response: any) => {
      console.log(response['exists']);

      if (response['exists'] == 'true') {
        console.log('richiamo la funzione di callback')
        callbackAviable();
      }

    });

  }


}
