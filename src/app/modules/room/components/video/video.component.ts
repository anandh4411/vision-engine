import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnChanges {
  @Input() activeVideoNumber: any;
  @Input() modeClassName: any;
  @Input() hostUser: any;
  @Input() user: any;
  @Input() isMobile: any;
  recordingStatus = false;
  public modeClassNameLocal = '';

  ngOnChanges(changes: SimpleChanges) {
    if (this.modeClassName) {
      switch (true) {
        case this.modeClassName.videoMode1:
          this.modeClassNameLocal = 'video-mode-1';
          break;
        case this.modeClassName.videoMode2:
          this.modeClassNameLocal = 'video-mode-2';
          break;
        case this.modeClassName.mobileVideoMode1:
          this.modeClassNameLocal = 'mobile-video-mode-1';
          break;
        case this.modeClassName.mobileVideoMode2:
          this.modeClassNameLocal = 'mobile-video-mode-2';
          break;
        default:
          this.modeClassNameLocal = '';
          break;
      }
    }
  }

  recordingStatusClick(status: any) {
    this.recordingStatus = status;
  }
}
