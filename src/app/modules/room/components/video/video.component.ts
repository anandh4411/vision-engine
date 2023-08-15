import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PeerService } from 'src/app/services/peer.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnChanges, OnInit, AfterViewInit {
  // for video
  @ViewChild('localVideo') localVideo: ElementRef | any;
  @ViewChild('remoteVideo') remoteVideo: ElementRef | any;
  room: string | any;
  // for video end

  @Input() activeVideoNumber: any;
  @Input() modeClassName: any;
  @Input() hostUser: any;
  @Input() user: any;
  @Input() isMobile: any;
  recordingStatus = false;
  public modeClassNameLocal = '';

  constructor(private peerService: PeerService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.peerService
      .getLocalStream()
      .then((stream: MediaStream) => {
        if (this.localVideo) {
          const localVideo = this.localVideo.nativeElement as HTMLVideoElement;
          localVideo.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing local media:', error);
      });
  }

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
