import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsComponent } from './participants.component';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantsComponent]
    });
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
