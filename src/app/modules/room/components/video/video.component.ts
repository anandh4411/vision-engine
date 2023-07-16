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
  @Input() swipedDown: any;

  public modeClassNameLocal: any;

  ngOnChanges(changes: SimpleChanges) {
    if (this.modeClassName) {
      if (this.modeClassName.videoMode1) {
        this.modeClassNameLocal = 'video-mode-1';
      } else if (this.modeClassName.videoMode2) {
        this.modeClassNameLocal = 'video-mode-2';
      } else if (this.modeClassName.mobileVideoMode1) {
        this.modeClassNameLocal = 'mobile-video-mode-1';
      } else {
        this.modeClassNameLocal = '';
      }
    }
  }
}
