import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from './models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {}

  findBookingsByDate(
    start: Date,
    end: Date,
    updateCallBack: (result: Map<string, Array<Booking>>) => void
  ) {
    let body = {
      from:
        start.getFullYear() +
        '-' +
        (start.getMonth() + 1) +
        '-' +
        start.getDate(),
      to: end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate(),
    };

    console.log(body);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Id': '83c785a5-ca1d-4c42-9c9e-719cab36db7d',
    });

    let result = new Map<string, Array<Booking>>();

    this.httpClient
      .post('http://localhost:8080/fake/api/slots/', body, { headers: headers })
      .subscribe((resp) => {
        let list = new Map<string, Array<Booking>>(Object.entries(resp));

        list.forEach((values, key) => {
          let bookings = new Array<Booking>();

          values.forEach((e) => {
            bookings.push({
              slotId: e.slotId,
              slotDate: new Date(e.slotDate),
              slotStartTime: e.slotStartTime,
              slotEndTime: e.slotEndTime,
              resource: e.resource,
            });
          });

          result.set(key.toString(), bookings);
        });

        updateCallBack(result);
      });
  }
}
