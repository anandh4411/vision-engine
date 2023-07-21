import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBlurredCommonComponent } from './modal-blurred-common.component';

describe('ModalBlurredCommonComponent', () => {
  let component: ModalBlurredCommonComponent;
  let fixture: ComponentFixture<ModalBlurredCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBlurredCommonComponent]
    });
    fixture = TestBed.createComponent(ModalBlurredCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
