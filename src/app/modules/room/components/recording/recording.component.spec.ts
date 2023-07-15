import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingComponent } from './recording.component';

describe('RecordingComponent', () => {
  let component: RecordingComponent;
  let fixture: ComponentFixture<RecordingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordingComponent]
    });
    fixture = TestBed.createComponent(RecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
