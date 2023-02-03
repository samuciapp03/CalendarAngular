import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { isErrorResponse } from '../../response/error.response'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MessageService } from '../../message.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  loading: boolean = false


  constructor(private readonly service: AuthService, private readonly router: Router,
              private readonly messageService: MessageService) {
  }

  async login() {
    if (this.form.valid) {
      this.loading = true
      const lr = { username: this.form.value.username!, password: this.form.value.password! }
      try {
        await this.service.login(lr)
        this.messageService.success('Login successful')
        await this.router.navigateByUrl('/groups')
      } catch (e: any) {
        if (isErrorResponse(e.error)) {
          this.messageService.error(e.error.message)
        }
      } finally {
        this.loading = false
      }
    }
  }

  async register() {
    await this.router.navigateByUrl('/register')
  }

  async fp() {
    await this.router.navigateByUrl('/password-forgotten')
  }

  async ngOnInit() {
    if (this.service.user !== null) {
      await this.router.navigateByUrl('/month')
    }
  }
}
