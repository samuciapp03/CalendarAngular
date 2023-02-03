import { TestBed } from '@angular/core/testing';

import { ExcelBookingServiceService } from './excel-booking-service.service';

describe('ExcelBookingServiceService', () => {
  let service: ExcelBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
