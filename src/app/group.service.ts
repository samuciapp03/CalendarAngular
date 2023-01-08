import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAllGroups(): Observable<Object> {
    return this.httpClient.get('http://localhost:8080/api/groups/');
  }

  getGroupById(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/groups/' + id);
  }

  createGroup(group: Group):Observable<Object> {
    return this.httpClient.post('http://localhost:8080/api/groups/', group);
  }

  /*
  updateGroup(group: Group, updateCallback: () => void) {
    let url = 'http://localhost:8080/api/groups/' + group.id;

    this.httpClient.put(url, group).subscribe((response) => {
      console.log("Risposta ricevuta");
      updateCallback();
    })

  }
*/

udpateGroup(group:Group):Observable<Object>{
  return this.httpClient.put('http://localhost:8080/api/groups/'+group.id, group);
}

  deleteGroup(id: number):Observable<Object> {
    return this.httpClient.delete('http://localhost:8080/api/groups/' + id);
  }







}
