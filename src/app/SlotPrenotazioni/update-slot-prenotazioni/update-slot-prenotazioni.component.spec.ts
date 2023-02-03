import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSlotPrenotazioniComponent } from './update-slot-prenotazioni.component';

describe('UpdateSlotPrenotazioniComponent', () => {
  let component: UpdateSlotPrenotazioniComponent;
  let fixture: ComponentFixture<UpdateSlotPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSlotPrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSlotPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
