import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPageBookingComponent } from './excel-page-booking.component';

describe('ExcelPageBookingComponent', () => {
  let component: ExcelPageBookingComponent;
  let fixture: ComponentFixture<ExcelPageBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelPageBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelPageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
