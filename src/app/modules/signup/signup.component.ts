import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('otp') otp: ElementRef | any;
  imgResultAfterCompression: any;
  // for preloader
  windowLoaded = false;
  apiResponded = false;
  loaderHidden = false;
  loaderTitle = 'Signup';
  // for preloader end
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
  userExists = false;

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public toastService: ToastService,
    private router: Router,
    private imageCompress: NgxImageCompressService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+')]],
      email: [
        '',
        [Validators.required],
        [this.userExistsValidator(this.userService)],
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

  // Custom async validator function
  userExistsValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const obj = {
        email: control.value,
      };
      if (this.isValidEmailPattern(control.value)) {
        return userService.createUser(obj).pipe(
          map((exists) => (exists ? { emailExists: true } : null)),
          catchError(() => of(null))
        );
      } else {
        return of({ invalidPattern: true });
      }
    };
  }
  isValidEmailPattern(email: string): boolean {
    const pattern = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}/;
    return pattern.test(email);
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.handleRouteChange();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
    if (this.email)
      this.userService.dicardCreateUser(this.email).subscribe((res: any) => {
        console.log(res);
      });
  }

  // for preloader
  ngAfterViewInit() {
    setTimeout(() => {
      this.windowLoaded = true;
    }, 1000);
  }
  checkLoaded(loaded: any) {
    if (loaded == 'true') this.loaderHidden = true;
  }
  // for preloader end

  // this is for fixing modal height issues on page change
  private handleRouteChange() {
    if (this.router.url == '/home') {
      document.body.classList.add('profile-modal-active');
    } else {
      document.body.classList.remove('profile-modal-active');
    }
  }

  showSuccess(message: any) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  createAccount() {
    Object.keys(this.userForm.controls).forEach((controlName) => {
      this.userForm.get(controlName)?.markAsTouched();
    });
    if (this.userForm.valid) {
      this.loader = true;
      this.formData.append('profile_pic', this.croppedImage);
      this.formData.append('name', this.userForm.get('name')?.value);
      this.formData.append('email', this.userForm.get('email')?.value);
      this.formData.append('phone', this.userForm.get('phone')?.value);
      this.formData.append('password', this.userForm.get('password')?.value);
      this.userService.createUser(this.formData).subscribe((res: any) => {
        if (res.user_exists) {
          this.userExists = true;
          this.loader = false;
          console.log(res);
        } else {
          this.loader = false;
          this.email = res;
          this.open(this.otp);
          this.OtpTimer(30);
        }
      });
    }
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
      else {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.close(otp);
      }
    });
  }

  removeOtpError() {
    if (this.otpInvalid) this.otpInvalid = false;
  }

  resendOtp() {
    if (!this.resendOtpVar) return;
    this.loader = true;
    this.userService
      .resendOtp({
        email: this.email,
      })
      .subscribe((res: any) => {
        this.email = res;
        this.showSuccess('Otp resended to ' + this.email);
        this.OtpTimer(30);
        this.loader = false;
        this.resendOtpVar = false;
      });
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

  // image crop and compress
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  blobToFile(blob: Blob, fileName: string): File {
    const fileType = blob.type;
    const parts = [blob];
    const file = new File(parts, fileName, { type: fileType });
    return file;
  }
  dataURLToBlob(dataURL: string): Blob {
    const base64String = dataURL.split(',')[1];
    const byteCharacters = atob(base64String);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: 'image/png' });
  }
  async blobToDataURL(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result as string;
        resolve(dataURL);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }
  async imageCropped(event: ImageCroppedEvent) {
    try {
      const base64String = await this.blobToDataURL(event.blob!);
      this.compressFile(base64String);
    } catch (error) {
      console.error('Error converting Blob to Base64:', error);
    }
  }
  async compressFile(image: any) {
    try {
      this.imgResultAfterCompression = await this.imageCompress.compressFile(
        image,
        -1,
        50,
        50,
        160
      );
      const newBlob = this.dataURLToBlob(this.imgResultAfterCompression);
      this.croppedImage = this.blobToFile(newBlob!, 'profile.png');
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }
  // image crop and compress end

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
