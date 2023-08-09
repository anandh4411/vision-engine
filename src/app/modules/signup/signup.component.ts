import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  passwordHide = true;
  cpasswordHide = true;
  uploading = false;
  loginMethodsActive = false;
  otpMethod = '';
  isMobile: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  interval: any;
  countDown: any = '00:30';
  public fd: any;
  public userForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.min(1000000000),
          Validators.max(1000000000000000),
        ],
      ],
      password: ['', [Validators.required, Validators.min(10000000)]],
      cpassword: ['', [Validators.required]],
    });
    this.userForm
      .get('cpassword')
      ?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this),
      ]);
  }

  // Custom validator function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.root.get('password')?.value !== control.value)
      return { passwordMismatch: true };
    return null;
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

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
    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    this.fd.append('profile_pic', event.blob);
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
