import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  passwordHide = true;
  cpasswordHide = true;
  public uploading: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  loginMethodsActive: boolean = false;
  public isMobile: any;
  otpMethod: string = '';
  countDown: any = '00:30';
  interval: any;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  changeMethod() {
    this.loginMethodsActive = !this.loginMethodsActive;
  }

  open(modalName: any) {
    this.modalService.open(modalName, { centered: true });
  }
  close(modalName: any) {
    this.modalService.dismissAll();
    this.otpMethod = '';
    this.stopOtpTimer();
  }

  uploadProPic() {
    this.uploading = !this.uploading;
  }

  // image crop
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  // image crop end
  clearProPic() {
    this.imageChangedEvent = '';
  }
  proPicDone() {}

  onFileDropped(event: any) {
    this.imageChangedEvent = { target: { files: [event[0]] } };
  }

  sendOtp(method: any) {
    this.otpMethod = method;
    this.OtpTimer(30);
  }

  OtpTimer(seconds: any) {
    let remainingSeconds: number = seconds;
    let formattedSeconds: string = '00';
    this.interval = setInterval(() => {
      remainingSeconds--;
      const seconds = remainingSeconds % 60;
      formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      this.countDown = `00:${formattedSeconds}`;
      if (remainingSeconds <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  stopOtpTimer() {
    clearInterval(this.interval);
    this.countDown = '00:30';
  }
}
