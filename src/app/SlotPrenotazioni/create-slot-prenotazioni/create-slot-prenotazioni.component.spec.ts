import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlotPrenotazioniComponent } from './create-slot-prenotazioni.component';

describe('CreateSlotPrenotazioniComponent', () => {
  let component: CreateSlotPrenotazioniComponent;
  let fixture: ComponentFixture<CreateSlotPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSlotPrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSlotPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
