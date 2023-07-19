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

  public subtitleStatus: boolean = false;
  public modeClassNameLocal: any;

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modeClassName'].currentValue == 'mobile-video-mode-2') {
      this.modeClassNameLocal = 'mobile-video-mode-2';
    } else {
      this.modeClassNameLocal = '';
    }
  }

  public subtitleSwitch() {
    this.subtitleStatus = !this.subtitleStatus;
  }
}
