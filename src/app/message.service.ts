import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

export type Message = {
  text: string
  level: 'info' | 'success' | 'warning' | 'error'
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages = new Subject<Message>();
  constructor() { }

  add(message: Message) {
    this.messages.next(message)
  }

  info(text: string) {
    this.add({ text, level: 'info' })
  }

  success(text: string) {
    this.add({ text, level: 'success' })
  }

  warning(text: string) {
    this.add({ text, level: 'warning' })
  }

  error(text: string) {
    this.add({ text, level: 'error' })
  }
}
