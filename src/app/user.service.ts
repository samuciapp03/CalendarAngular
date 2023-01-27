import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwIfEmpty } from 'rxjs';
import { User } from './user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getAllUsers(): Observable<Object> {
    return this.httpClient.get('http://localhost:8080/api/users/', this.auth.headers);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/api/users/' + id, this.auth.headers);
  }

  createUser(user: User):Observable<Object> {
    return this.httpClient.post('http://localhost:8080/api/users/', user, this.auth.headers);
  }

  getUsersFromAGroup(id:number):Observable<Object>{
    return this.httpClient.get('http://localhost:8080/api/users/'+id+'/usrs_from_group', this.auth.headers)
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
    return this.httpClient.put('http://localhost:8080/api/users/'+user.id, user, this.auth.headers);
  }

  

  deleteUser(id:number){
    return this.httpClient.delete('http://localhost:8080/api/users/'+id, this.auth.headers);
  }

  valueAviable(value:string, callbackAviable: () => void){

    this.httpClient.get('http://localhost:8080/api/users?value='+value, this.auth.headers).subscribe((response:any) => {
      console.log(response['exists']);

      if(response['exists'] == 'true'){
        console.log('richiamo la funzione di callback')
        callbackAviable();
      }
      
    });
    
  }



}
