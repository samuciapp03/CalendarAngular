import { Component } from '@angular/core';
import { Message, MessageService } from "./message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: Message[] = []

  constructor(private readonly route: ActivatedRoute, private readonly router: Router,
              readonly service: AuthService, private readonly messageService: MessageService) {
    this.messageService.messages.subscribe(message => {
      this.messages.push(message)
      setTimeout(() => {
        this.messages = this.messages.filter(m => m !== message)
      }, 10000)
    })
  }

  get user() {
    return this.service.user
  }

  get isLoggedIn() {
    return this.service.isLoggedIn
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  logout() {
    this.service.logout()
    this.router.navigateByUrl('/login')
    this.messageService.success('Logout successful')
  }

  getAlertClass(message: Message) {
    switch (message.level) {
      case 'success':
        return 'alert-success'
      case 'info':
        return 'alert-info'
      case 'warning':
        return 'alert-warning'
      case 'error':
        return 'alert-danger'
    }
  }
}
