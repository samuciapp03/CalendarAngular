import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../models/booking.model";
import {BookingService} from "../../booking.service";

@Component({
  selector: 'app-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.css'],
})
export class ModalBodyComponent implements OnInit {

  @Input() booking: any;

  constructor(private service: BookingService) {
  }

  deleteBooking() {
    this.service.deleteBooking(this.booking);
  }

  bookBooking() {
    this.service.bookBooking(this.booking);
  }

  ngOnInit(): void {
    this.booking = this.booking as Booking
  }
}
