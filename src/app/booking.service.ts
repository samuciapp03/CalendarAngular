import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Booking} from './models/booking.model';
import {BookingDto} from "./models/dto/booking.dto";

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcHJlbm90YXppb25lX3Jpc29yc2UiLCJzdWIiOiIxIiwiZmlyc3RuYW1lIjoiRW1pbGlhbm8iLCJuYmYiOjE2NzM1Mzc2NzcsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3ByZW5vdGF6aW9uZV9yaXNvcnNlIiwiZXhwIjoxNjgzNTM4NTc3LCJpYXQiOjE2NzM1Mzc2NzcsImVtYWlsIjoiZW1pbGlhbm8yMzAxMDRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJFTUlOQVZBIiwibGFzdG5hbWUiOiJOYXZhIn0.rkE2kzfR4apzmb0c71xx4DVZ1q6a8jnkEtFDTffeB1E',
  });

  findBookingsByDate(
    start: Date,
    end: Date,
    updateCallBack: (result: Map<string, Array<Booking>>) => void
  ) {
    let body = {
      from:
        start.getFullYear() +
        '-' +
        ('0' + start.getMonth() + 1).slice(-2) +
        '-' +
        ('0' + start.getDate()).slice(-2),
      to: end.getFullYear() + '-' + ('0' + (end.getMonth() + 1)).slice(-2) + '-' + ('0' + end.getDate()).slice(-2),
    };

    console.log(body);

    let result = new Map<string, Array<Booking>>();

    this.httpClient
      .post('http://localhost:8080/calendar/api/booking/user', body, {headers: this.headers})
      .subscribe((resp) => {
        let list = new Map<string, Array<BookingDto>>(Object.entries(resp));

        list.forEach((values, key) => {
          let bookings = new Array<Booking>();

          values.forEach((e) => {
            bookings.push({
              id: e.slot.id,
              date: new Date(e.slot.date),
              from: e.slot.from,
              to: e.slot.to,
              resource: e.slot.resource,
              free: e.slot.free,
              bookingId: e.booking.bookingId,
              bookingName: e.booking.bookingName,
              bookingDate: new Date(e.booking.bookingDate)
            });
          });

          result.set(key.toString(), bookings);
        });

        updateCallBack(result);
      });
  }

  deleteBooking(booking: Booking) {
    const {id} = booking;
    this.httpClient.delete('http://localhost:8080/calendar/api/booking/' + booking.bookingId, {headers: this.headers}).subscribe(resp => {
      console.log(resp)
    })
  }

  bookBooking(booking: Booking) {
    const {id} = booking;
    this.httpClient.post('http://localhost:8080/calendar/api/booking/' + booking.id, '', {headers: this.headers})
      .subscribe({
        next: console.log,
        error: console.log
      })
  }
}
