import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { Email } from "./models/email.model";

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  BASE_URL = 'http://localhost:8080/api/emails'

  constructor(private httpClient: HttpClient, private readonly auth: AuthService) {
  }

  findEmails(): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.BASE_URL)
  }

  findEmailById(id: number): Observable<Email> {
    return this.httpClient.get<Email>(this.BASE_URL + '/' + id)
  }

  deleteEmailById(id: number): Observable<Object> {
    return this.httpClient.delete(this.BASE_URL + '/' + id)
  }

  resendEmailById(id: number) {
    return this.httpClient.post(this.BASE_URL + '/' + id + '/resend', null)
  }
}
