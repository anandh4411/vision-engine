import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-video-bottom-bar',
  templateUrl: './video-bottom-bar.component.html',
  styleUrls: ['./video-bottom-bar.component.scss']
})
export class VideoBottomBarComponent {
  @Input() windowModeStatus:any;

  public subtitleStatus:boolean = false;
  public subtitleSwitch(){
    this.subtitleStatus = !this.subtitleStatus;
  }
}