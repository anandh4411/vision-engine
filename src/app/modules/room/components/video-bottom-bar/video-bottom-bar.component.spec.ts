import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBottomBarComponent } from './video-bottom-bar.component';

describe('VideoBottomBarComponent', () => {
  let component: VideoBottomBarComponent;
  let fixture: ComponentFixture<VideoBottomBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoBottomBarComponent]
    });
    fixture = TestBed.createComponent(VideoBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
