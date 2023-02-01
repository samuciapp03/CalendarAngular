import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPageResourceComponent } from './excel-page-resource.component';

describe('ExcelPageResourceComponent', () => {
  let component: ExcelPageResourceComponent;
  let fixture: ComponentFixture<ExcelPageResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelPageResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelPageResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
