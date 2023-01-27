import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {BookingService} from '../../booking.service';
import {Booking} from '../../models/booking.model';

@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent implements OnInit {
  month: number = 0;
  year: number = 0;
  today = new Date();
  currentMonth: string = '';
  calendar: Array<Array<Date>> = new Array<Array<Date>>();
  bookings: Map<string, Array<Booking>> = new Map<string, Array<Booking>>();
  listResources: Array<string> = new Array<string>();
  loading: boolean = true;
  resourceFilter?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private service: BookingService
  ) {
    this.title.setTitle('Calendar - Month');
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const routeParams = this.route.snapshot.paramMap;
    this.month = Number(routeParams.get('month'));
    this.year = Number(routeParams.get('year'));

    this.resourceFilter = this.route.snapshot.queryParamMap
      .get('res')
      ?.toString();

    console.clear();
    console.log('month:' + this.month);
    console.log('year:' + this.year);
    console.log('resource filter: ' + this.resourceFilter);

    this.calendar = this.generateCalendar(this.year, this.month);

    this.service.findBookingsByDate(
      this.calendar[0][0],
      this.calendar[this.calendar.length - 1][
      this.calendar[this.calendar.length - 1].length - 1
        ],
      (result) => {
        result.forEach((value, key) => {
          if (this.resourceFilter != null) {
            let bookings = new Array<Booking>();

            value.forEach((book) => {
              if (book.resource.name === this.resourceFilter) {
                bookings.push(book);
              }
            });

            this.bookings.set(key, bookings);
          } else {
            this.bookings.set(key, value);
          }
        });

        result.forEach((e) => {
          e.forEach((book) => {
            if (!this.listResources.includes(book.resource.name))
              this.listResources.push(book.resource.name);
          });
        });

        console.log(this.bookings);
        this.loading = false;
      }
    );
  }

  previousMonth() {
    if (this.month == 1) {
      this.month = 12;
      this.year -= 1;
    } else {
      this.month -= 1;
    }

    this.router.navigate(['month/' + this.year + '/' + this.month]);
  }

  nextMonth() {
    if (this.month == 12) {
      this.month = 1;
      this.year += 1;
    } else {
      this.month += 1;
    }

    this.router.navigate(['month/' + this.year + '/' + this.month]);
  }

  goCurrentDate() {
    this.router.navigate(['month']);
  }

  goToDay(year: number, month: number, day: number) {
    this.router.navigate(['day/' + year + '/' + (month + 1) + '/' + day]);
  }

  filter(resource: string) {
    if (this.listResources.includes(resource)) {
      this.router.navigate(['month/' + this.year + '/' + this.month], {
        queryParams: {res: resource},
      });
    } else {
      this.router.navigate(['month/' + this.year + '/' + this.month]);
    }
  }

  generateCalendar(year: number, month: number): Array<Array<Date>> {
    let date = new Date(year, month - 1);

    while (
      date.toLocaleDateString('en-US', {
        weekday: 'long',
      }) != 'Monday'
      ) {
      date.setDate(date.getDate() - 1);
    }

    let listCalendar = new Array<Array<Date>>();
    let days = new Array<Date>();

    while (month != 12 ? date.getMonth() != month : date.getMonth() != 0) {
      days.push(new Date(date));

      if (days.length == 7) {
        listCalendar.push(days);
        days = new Array<Date>();
      }

      date.setDate(date.getDate() + 1);
    }

    date.setDate(date.getDate() - 1);

    this.currentMonth = date.toLocaleDateString('en-US', {
      month: 'long',
    });

    while (
      date.toLocaleDateString('en-US', {
        weekday: 'long',
      }) != 'Sunday'
      ) {
      date.setDate(date.getDate() + 1);

      days.push(new Date(date));

      if (days.length == 7) {
        listCalendar.push(days);
        days = new Array<Date>();
      }
    }

    console.log(listCalendar);

    return listCalendar;
  }
}
