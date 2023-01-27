import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResourceComponent } from './delete-resource.component';

describe('DeleteResourceComponent', () => {
  let component: DeleteResourceComponent;
  let fixture: ComponentFixture<DeleteResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
