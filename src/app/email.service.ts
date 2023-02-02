import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Email } from './models/email.model'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root',
})
export class EmailService {
	BASE_URL = 'http://localhost:8080/api/emails'

	private get headerOptions() {
		return { headers: { 'Authorization': `Bearer ${this.auth.token}` } }
	}

	constructor(private httpClient: HttpClient, private readonly auth: AuthService) {
	}

	findEmails(): Observable<Email[]> {
		return this.httpClient.get<Email[]>(this.BASE_URL, this.headerOptions)
	}

	findEmailById(id: number): Observable<Email> {
		return this.httpClient.get<Email>(this.BASE_URL + '/' + id, this.headerOptions)
	}

	deleteEmailById(id: number): Observable<Object> {
		return this.httpClient.delete(this.BASE_URL + '/' + id, this.headerOptions)
	}

	resendEmailById(id: number) {
		return this.httpClient.post(this.BASE_URL + '/' + id + '/resend', null, this.headerOptions)
	}
}
