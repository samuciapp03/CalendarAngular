import { TestBed } from '@angular/core/testing';

import { ExcelResourceServiceService } from './excel-resource-service.service';

describe('ExcelResourceServiceService', () => {
  let service: ExcelResourceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelResourceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
