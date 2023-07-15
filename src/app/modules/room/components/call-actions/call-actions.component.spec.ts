import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallActionsComponent } from './call-actions.component';

describe('CallActionsComponent', () => {
  let component: CallActionsComponent;
  let fixture: ComponentFixture<CallActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallActionsComponent]
    });
    fixture = TestBed.createComponent(CallActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
