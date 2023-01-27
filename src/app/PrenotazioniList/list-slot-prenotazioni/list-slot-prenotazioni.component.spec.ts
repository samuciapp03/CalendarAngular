import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSlotPrenotazioniComponent } from './list-slot-prenotazioni.component';

describe('ListSlotPrenotazioniComponent', () => {
  let component: ListSlotPrenotazioniComponent;
  let fixture: ComponentFixture<ListSlotPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSlotPrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSlotPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
