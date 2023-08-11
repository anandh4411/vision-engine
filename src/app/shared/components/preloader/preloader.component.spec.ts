import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderComponent } from './preloader.component';

describe('PreloaderComponent', () => {
  let component: PreloaderComponent;
  let fixture: ComponentFixture<PreloaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreloaderComponent]
    });
    fixture = TestBed.createComponent(PreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
