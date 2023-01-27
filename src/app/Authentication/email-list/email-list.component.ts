import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Email } from '../email'
import { EmailService } from '../email.service'
import { MessageService } from '../message.service'


@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
	emails: Array<Email> = []

	constructor(private readonly route: ActivatedRoute, private readonly service: EmailService,
	            private readonly router: Router, private readonly messageService: MessageService) {
	}

	ngOnInit(): void {
		this.fetchEmails()
	}

	private fetchEmails() {
		this.service.findEmails().subscribe((response: Email[]) => {
			this.emails = response
		})
	}

	detail(id: number) {
		this.router.navigateByUrl('/email-detail/' + id)
	}

	deleteEntity(id: number) {
		if (confirm('Sei sicuro di voler eliminare l\'elemento selezionato?')) {
			this.service.deleteEmailById(id).subscribe({
				next: () => {
					this.messageService.success('Email eliminata con successo')
					this.fetchEmails()
				},
				error: (err) => {
					console.error('Observer got an error: ' + err)
					this.messageService.error(err.error.message)
				},
			})
		}
	}

	resendEmail(id: number) {
		this.service.resendEmailById(id).subscribe({
			next: () => {
				this.messageService.success('Email inviata con successo')
				this.fetchEmails()
			},
			error: (err) => {
				console.error('Observer got an error: ' + err)
				this.messageService.error(err.error.message)
			},
		})
	}
}