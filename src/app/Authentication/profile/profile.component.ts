import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MessageService } from '../message.service'
import { User } from '../models/user.model'
import { repeatPasswordValidator } from '../validators'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  token!: string;
  profileForm!: FormGroup
  
  isFirstButtonVisible: boolean = false;
  constructor(private readonly router: Router, private readonly authService: AuthService){
 
   this.profileForm = new FormGroup({
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
     }, { validators: repeatPasswordValidator })
 
     const t = this.authService.token 
     console.log(t)
     if (t === null) {
       this.router.navigate(['/'])
     } else {
       this.token = t
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
 get email() {
   return this.profileForm.get('email')!
 }
 
 
  changeButton(): void{
   this.isFirstButtonVisible = true;
  }
 
  onSave(): void{
   
   this.isFirstButtonVisible = false;
  }
 
  goBack():void{
   this.isFirstButtonVisible = false;
  }
 
  get user() {
   return this.authService.user
 }
 }
