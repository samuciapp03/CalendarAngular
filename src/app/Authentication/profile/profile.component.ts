import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { repeatPasswordValidator } from '../../validators'
import { ErrorsResponse, isErrorsResponse } from '../../response/errors.response';
import { MessageService } from '../../message.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm = new FormGroup({
    username: new FormControl(this.authService.user?.username, [
      Validators.minLength(4),
      Validators.maxLength(32),
    ]),
    firstName: new FormControl(this.authService.user?.firstName, [
      Validators.maxLength(255),
    ]),
    lastName: new FormControl(this.authService.user?.lastName, [
      Validators.maxLength(255),
    ]),
  })
  isFirstButtonVisible = false;
  constructor(private readonly router: Router, private readonly authService: AuthService,
              private readonly messageService: MessageService) {
    this.isEditing = false
  }

  get isEditing() {
    return !this.profileForm.disabled
  }

  set isEditing(value: boolean) {
    if (value) {
      this.profileForm.enable()
    } else {
      this.profileForm.disable()
    }
  }

  get firstName() {
    return this.profileForm.get('firstName')!
  }

  get lastName() {
    return this.profileForm.get('lastName')!
  }

  get username() {
    return this.profileForm.get('username')!
  }

  changeButton(): void {
    this.isFirstButtonVisible = true;
  }

  onSave(): void {
    this.isFirstButtonVisible = false;
  }

  goBack(): void {
    this.isFirstButtonVisible = false;
  }

  get user() {
    return this.authService.user
  }

  cancel() {
    this.isEditing = false
    this.profileForm.setValue({
      username: this.authService.user?.username,
      firstName: this.authService.user?.firstName,
      lastName: this.authService.user?.lastName,
    })
  }

  async save() {
    if (this.profileForm.invalid) {
      return
    }
    try {
      await this.authService.updateProfile({
        username: this.username.value!,
        firstName: this.firstName.value!,
        lastName: this.lastName.value!,
      })
    } catch (e: any) {
      if (isErrorsResponse(e.error)) {
        (e.error as ErrorsResponse).forEach(err => {
          this.messageService.error(err.message)
        })
      }
    }
  }

  async changePassword() {
    try {
      const res = await this.authService.requestPasswordChange()
      this.messageService.success(res.message)
    } catch (e: any) {
      if (isErrorsResponse(e.error)) {
        (e.error as ErrorsResponse).forEach(err => {
          this.messageService.error(err.message)
        })
      }
    }
  }
}
