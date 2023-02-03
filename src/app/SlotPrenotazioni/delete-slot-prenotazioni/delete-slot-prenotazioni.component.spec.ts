import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlotPrenotazioniComponent } from './delete-slot-prenotazioni.component';

describe('DeleteSlotPrenotazioniComponent', () => {
  let component: DeleteSlotPrenotazioniComponent;
  let fixture: ComponentFixture<DeleteSlotPrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSlotPrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSlotPrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
