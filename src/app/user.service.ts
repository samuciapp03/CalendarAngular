import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<Object> {
    return this.httpClient.get('http://localhost:8080/api/users/');
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/api/users/' + id);
  }

  createUser(user: User):Observable<Object> {
    return this.httpClient.post('http://localhost:8080/api/users/', user);
  }

  /*
  updateUser(user: User, updateCallback: () => null):Observable<Object> {
    let url = 'http://localhost:8080/api/users/' + user.id;

    this.httpClient.put(url, user).subscribe((response) => {
      console.log("Risposta ricevuta");

      updateCallback();

    })
  }
  */

  updateUser(user:User):Observable<Object>{
    return this.httpClient.put('http://localhost:8080/api/users/'+user.id, user);
  }

  

  deleteUser(id:number){
    return this.httpClient.delete('http://localhost:8080/api/users/'+id);
  }



}
