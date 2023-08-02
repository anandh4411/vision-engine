import { Component } from '@angular/core';

@Component({
  selector: 'app-call-actions',
  templateUrl: './call-actions.component.html',
  styleUrls: ['./call-actions.component.scss'],
})
export class CallActionsComponent {
  isMicMuted = true;
  isCameraOff = true;
  isEndCall = false;

  toggleMic() {
    this.isMicMuted = !this.isMicMuted;
  }

  toggleCamera() {
    this.isCameraOff = !this.isCameraOff;
  }

  endCall() {
    this.isEndCall = !this.isEndCall;
  }
}
