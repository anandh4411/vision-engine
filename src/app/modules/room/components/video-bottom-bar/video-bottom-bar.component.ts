import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-video-bottom-bar',
  templateUrl: './video-bottom-bar.component.html',
  styleUrls: ['./video-bottom-bar.component.scss'],
})
export class VideoBottomBarComponent implements OnInit, OnChanges {
  @Input() activeVideoNumber: any;
  @Input() isMobile: any;
  @Input() modeClassName: any;

  public subtitleStatus = false;
  public modeClassNameLocal = '';

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('modeClassName' in changes) {
      this.modeClassNameLocal =
        this.modeClassName === 'mobile-video-mode-2'
          ? 'mobile-video-mode-2'
          : '';
    }
  }

  public subtitleSwitch() {
    this.subtitleStatus = !this.subtitleStatus;
  }
}
