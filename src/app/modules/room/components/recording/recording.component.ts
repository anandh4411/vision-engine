import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
})
export class RecordingComponent {
  @Output() recordingStatusNotify: EventEmitter<any> = new EventEmitter<any>();
  @Input() activeVideoNumber: any;
  @Input() isMobile: any;

  public recordingStatus = false;
  public recordingEnableAnimation = false;

  public pauseRecording() {}
  public startRecording() {
    this.recordingStatus = !this.recordingStatus;
    this.recordingStatusNotify.emit(this.recordingStatus);
    if (!this.recordingEnableAnimation) {
      setTimeout(() => {
        this.recordingEnableAnimation = true;
      }, 600);
    } else {
      this.recordingEnableAnimation = false;
    }
  }
}
