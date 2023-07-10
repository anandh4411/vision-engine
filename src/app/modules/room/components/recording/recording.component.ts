import { Component } from '@angular/core';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss']
})
export class RecordingComponent {
  public recordingStatus:boolean = false;
  public recordingEnableAnimation:boolean = false;

  public pauseRecording(){}
  public startRecording(){
    this.recordingStatus = !this.recordingStatus;
    if(!this.recordingEnableAnimation){
      setTimeout(()=>{ 
        this.recordingEnableAnimation = true;               
      }, 600);
    }
    else{
      this.recordingEnableAnimation = false;
    }
  }

}
