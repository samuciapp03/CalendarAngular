import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSlotPrenotazioniComponent } from './detail-slot-prenotazioni.component';

describe('DetailSlotPrenotazioniComponent', () => {
  let component: DetailSlotPrenotazioniComponent;
  let fixture: ComponentFixture<DetailSlotPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSlotPrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSlotPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
