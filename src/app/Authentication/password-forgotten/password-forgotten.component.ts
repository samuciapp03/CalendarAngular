import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { FormControl, Validators } from '@angular/forms'
import { ErrorsResponse, isErrorsResponse } from '../../response/errors.response'
import { MessageService } from '../../message.service'

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.css']
})
export class PasswordForgottenComponent {
  email = new FormControl('', [Validators.required, Validators.email])
  loading: boolean = false

  constructor(private readonly service: AuthService, private readonly router: Router,
              private readonly messageService: MessageService) {
  }

  async passwordForgotten() {
    if (this.email.valid) {
      this.loading = true
      try {
        const s = await this.service.passwordForgotten(this.email.value!);
        this.messageService.success(s.message);
        await this.router.navigateByUrl('/login')
      } catch (e: any) {
        if (isErrorsResponse(e.error)) {
          (e.error as ErrorsResponse).forEach(err => {
            this.messageService.error(err.message)
          })
        }
      } finally {
        this.loading = false
      }
    }
  }
}