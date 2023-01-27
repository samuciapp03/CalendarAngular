import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { ErrorsResponse, isErrorsResponse } from '../response/errors.response'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
export class ActivateUserComponent implements OnInit {
  token?: string

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService,
              private readonly messageService: MessageService) {
    const t = this.route.snapshot.queryParamMap.get('token')
    console.log(t)
    if (t === null) {
      this.router.navigate(['/'])
    } else {
      this.token = t
    }
  }

  async ngOnInit() {
    if (this.token === undefined) {
      await this.router.navigate(['/'])
      return
    }
    try {
      const res = await this.authService.activateUser({ token: this.token })
      this.messageService.success(res.message)
      await this.router.navigate(['/login'])
    } catch (e: any) {
      if (isErrorsResponse(e.error)) {
        (e.error as ErrorsResponse).forEach(err => {
          this.messageService.error(err.message)
        })
      }
    }
  }
}