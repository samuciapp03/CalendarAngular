import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {Booking} from '../../models/booking.model';
import {BookingService} from '../../booking.service';

@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent implements OnInit {
  month?: number | null;
  year?: number | null;
  day?: number | null;
  currentDate: string = '';
  loading: boolean = true;
  resourceFilter?: string;
  selectedBooking?: Booking;

  list: Map<number, Array<Booking>> = new Map<number, Array<Booking>>();
  listResources: Array<string> = new Array<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private location: Location,
    private service: BookingService
  ) {
    this.title.setTitle('Calendar - Day');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.year = Number(routeParams.get('year'));
    this.month = Number(routeParams.get('month'));
    this.day = Number(routeParams.get('day'));

    this.resourceFilter = this.route.snapshot.queryParamMap
      .get('res')
      ?.toString();

    this.currentDate = new Date(
      this.year,
      this.month - 1,
      this.day
    ).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    console.clear();
    console.log('year:' + this.year);
    console.log('month:' + this.month);
    console.log('day:' + this.day);
    console.log('resource filter: ' + this.resourceFilter);

    let today = new Date(this.year, this.month - 1, this.day);

    let listBookings = new Array<Booking>();

    this.service.findBookingsByDate(today, today, (result) => {
      result
        .get(
          today.getFullYear() +
          '-' +
          ('0' + (today.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + today.getDate()).slice(-2)
        )
        ?.forEach((booking) => {

          if (this.resourceFilter == null) {
            listBookings.push(booking);
          } else if (
            this.resourceFilter != null &&
            booking.resource.name === this.resourceFilter
          ) {
            listBookings.push(booking);
          }

          if (!this.listResources.includes(booking.resource.name)) {
            this.listResources.push(booking.resource.name);
          }
        });

      console.log('list resources: ', this.listResources);
      console.log('bookings: ', listBookings);

      for (let i = 0; i < 24; i++) {
        let tempBookings = new Array();

        if (this.resourceFilter == null) {
          this.listResources.forEach((e) => tempBookings.push(null));
        } else {
          tempBookings.push(null);
        }

        listBookings.forEach((book) => {
          if (
            i >= Number(book.from.split(':')[0]) &&
            i < Number(book.to.split(':')[0])
          ) {
            if (this.resourceFilter == null) {
              tempBookings.splice(
                this.listResources.indexOf(book.resource.name),
                1,
                book
              );
            } else {
              tempBookings.splice(0, 1, book);
            }
          }
        });

        this.list.set(i, tempBookings);
      }

      console.log(this.list);

      this.loading = false;
    });
  }

  selectBook(book: Booking) {
    this.selectedBooking = book;
  }

  goBack() {
    this.router.navigate(['month/' + this.year + '/' + this.month]);
  }

  goCurrentDate() {
    this.router.navigate(['day']);
  }

  filter(resource: string) {
    if (this.listResources.includes(resource)) {
      this.router.navigate(
        ['day/' + this.year + '/' + this.month + '/' + this.day],
        { queryParams: { res: resource } }
      );
    } else {
      this.router.navigate([
        'day/' + this.year + '/' + this.month + '/' + this.day,
      ]);
    }
  }
}
