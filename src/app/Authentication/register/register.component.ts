import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { RegisterRequest } from '../requests/register.request'
import { ErrorsResponse, isErrorsResponse } from '../response/errors.response'
import { passwordValidator, repeatPasswordValidator } from '../validators'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup
	loading: boolean = false


	constructor(private readonly route: ActivatedRoute, private readonly service: AuthService,
	            private readonly router: Router, private readonly messageService: MessageService) {
		this.registerForm = new FormGroup({
			username: new FormControl('', [
				Validators.minLength(4),
				Validators.maxLength(32),
			]),
			email: new FormControl('', [
				Validators.minLength(4),
				Validators.maxLength(255),
				Validators.email,
			]),
			firstName: new FormControl('', [
				Validators.maxLength(255),
			]),
			lastName: new FormControl('', [
				Validators.maxLength(255),
			]),
			password: new FormControl('', [
				passwordValidator(),
			]),
			repeatPassword: new FormControl(''),
		}, { validators: repeatPasswordValidator })
	}

	get firstName() {
		return this.registerForm.get('firstName')!
	}

	get lastName() {
		return this.registerForm.get('lastName')!
	}

	get username() {
		return this.registerForm.get('username')!
	}

	get password() {
		return this.registerForm.get('password')!
	}

	get repeatPassword() {
		return this.registerForm.get('repeatPassword')!
	}

	get email() {
		return this.registerForm.get('email')!
	}


	ngOnInit(): void {
	}

	async register() {
		const { repeatPassword, ...req } = this.registerForm.value
		try {
			const res = await this.service.registerHttp(req as RegisterRequest)
			this.messageService.success(res.message)
			await this.router.navigateByUrl('/login')
		} catch (e: any) {
			if (isErrorsResponse(e.error)) {
				(e.error as ErrorsResponse).forEach(err => {
					this.messageService.error(err.message)
				})
			}
		}
	}

	login() {
		this.router.navigateByUrl('/login')
	}
}