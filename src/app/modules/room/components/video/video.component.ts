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

  public modeClassNameLocal: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.modeClassName);
    if (this.modeClassName) {
      if (this.modeClassName.videoMode1) {
        this.modeClassNameLocal = 'video-mode-1';
      } else if (this.modeClassName.videoMode2) {
        this.modeClassNameLocal = 'video-mode-2';
      } else {
        this.modeClassNameLocal = '';
      }
    }
  }
}
