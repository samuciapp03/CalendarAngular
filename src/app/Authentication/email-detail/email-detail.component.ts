import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, EMPTY } from 'rxjs'
import { Email } from '../../models/email.model'
import { EmailService } from '../../email.service'
import { MessageService } from '../../message.service'

@Component({
	selector: 'EmailDetailComponent',
	templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})

export class EmailDetailComponent implements OnInit {

	id: number | null
	detail?: Email

	constructor(private readonly route: ActivatedRoute, private readonly service: EmailService,
	            private readonly router: Router, private readonly messageService: MessageService) {
		this.id = route.snapshot.params['id']
	}

	ngOnInit(): void {
		if (this.id === null) {
			this.router.navigateByUrl('/email-list')
			return
		}
		this.service.findEmailById(this.id).subscribe({
			next: (obj: Email) => {
				this.detail = obj
			},
			error: (error: any) => {
				console.log('Error: ', error)
				if (error.status === 404) {
					this.messageService.error('Email not found')
					this.router.navigateByUrl('/email-list')
					return
				}
				this.messageService.error(error.message ?? 'Generic Error')
				this.router.navigateByUrl('/email-list')
			},
		})
	}
}
