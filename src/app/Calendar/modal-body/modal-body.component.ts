import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingService} from "../../booking.service";
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.css'],
})
export class ModalBodyComponent implements OnInit {

  @Input() booking: any;
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();

  constructor(private service: BookingService, readonly auth: AuthService) {
  }

  deleteBooking() {
    this.service.deleteBooking(this.booking, () => {
      this.onChange.emit();
    });

  }

  bookBooking() {
    this.service.bookBooking(this.booking, () => {
      this.onChange.emit();
    });
  }

  ngOnInit(): void {
    this.booking = this.booking as Booking
  }
}
