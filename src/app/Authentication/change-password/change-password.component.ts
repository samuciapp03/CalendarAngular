import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { passwordValidator, repeatPasswordValidator } from '../validators'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { ErrorsResponse, isErrorsResponse } from '../response/errors.response'
import { MessageService } from '../../message.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./email-list.component.css'],
})
export class ChangePasswordComponent {
  token!: string
  form = new FormGroup({
    password: new FormControl('', [Validators.required, passwordValidator]),
    repeatPassword: new FormControl('', [Validators.required]),
  }, { validators: repeatPasswordValidator })
  loading = false

  get password() {
    return this.form.get('password')!
  }

  get repeatPassword() {
    return this.form.get('repeatPassword')!
  }
  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService,
              private readonly messageService: MessageService) {

    const t = this.authService.token 
    console.log(t)
    if (t === null) {
      this.router.navigate(['/'])
    } else {
      this.token = t
    }
  }

  async changePassword() {
    if (this.form.invalid) {
      return
    }
    this.loading = true
    try {
      const res = await this.authService.changePassword({ token: this.token!, password: this.password.value })
      this.messageService.success(res.message)
      await this.router.navigate(['/login'])
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
