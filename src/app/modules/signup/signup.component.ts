import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ImageCroppedEvent,
  LoadedImage,
  base64ToFile,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('otp') otp: ElementRef | any;
  loader = false;
  passwordHide = true;
  cpasswordHide = true;
  uploading = false;
  loginMethodsActive = false;
  otpMethod = '';
  email: any;
  isMobile: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  interval: any;
  countDown: any = '00:30';
  public formData = new FormData();
  public userForm: FormGroup;
  public otpForm: FormGroup;
  resendOtpVar = false;
  otpInvalid = false;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private userService: UserService
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
    this.otpForm = this.formBuilder.group({
      input1: [''],
      input2: [''],
      input3: [''],
      input4: [''],
    });
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

  createAccount() {
    this.loader = true;
    this.formData.append('profile_pic', this.croppedImage);
    this.formData.append('name', this.userForm.get('name')?.value);
    this.formData.append('email', this.userForm.get('email')?.value);
    this.formData.append('phone', this.userForm.get('phone')?.value);
    this.formData.append('password', this.userForm.get('password')?.value);
    this.userService.createUser(this.formData).subscribe((res: any) => {
      this.loader = false;
      this.email = res;
      this.open(this.otp);
      this.OtpTimer(30);
    });
  }

  verifyOtp() {
    const otp =
      '' +
      this.otpForm.get('input1')?.value +
      this.otpForm.get('input2')?.value +
      this.otpForm.get('input3')?.value +
      this.otpForm.get('input4')?.value;
    const obj = {
      otp: otp,
      email: this.email,
    };
    this.userService.verifyOtp(obj).subscribe((res: any) => {
      if (res.invalid_otp) this.otpInvalid = true;
      else console.log(res);
    });
  }

  removeOtpError() {
    if (this.otpInvalid) this.otpInvalid = false;
  }

  resendOtp() {
    if (!this.resendOtpVar) return;
    console.log('rensend');
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
  blobToFile(blob: Blob, fileName: string): File {
    const fileType = blob.type;
    const parts = [blob];
    const file = new File(parts, fileName, { type: fileType });
    return file;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.blobToFile(event.blob!, 'profile.png');
  }
  // image crop end
  clearProPic() {
    this.imageChangedEvent = '';
  }
  proPicDone() {}

  onFileDropped(event: any) {
    this.imageChangedEvent = { target: { files: [event[0]] } };
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
        this.resendOtpVar = true;
      }
    }, 1000);
  }

  sendOtp(method: any) {}

  stopOtpTimer() {
    clearInterval(this.interval);
    this.countDown = '00:30';
  }
}
