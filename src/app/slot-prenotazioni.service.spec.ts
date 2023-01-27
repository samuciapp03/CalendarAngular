import { TestBed } from '@angular/core/testing';

import { SlotPrenotazioniService } from './slot-prenotazioni.service';

describe('SlotPrenotazioniService', () => {
  let service: SlotPrenotazioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotPrenotazioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
