import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/services/user.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loader = true;
  passwordHide = true;
  cpasswordHide = true;
  public userForm: FormGroup;
  public formData = new FormData();
  public profilePicOptions: boolean = false;
  public updateProfilePic: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  token: any;
  imageUrl: any;
  me: any;
  imgResultAfterCompression: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private imageCompress: NgxImageCompressService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.pattern('^[a-zA-Z ]+')]],
      phone: [
        '',
        [
          Validators.pattern('[0-9]+'),
          Validators.min(1000000000),
          Validators.max(1000000000000000),
        ],
      ],
      password: ['', [Validators.min(10000000)]],
      cpassword: [''],
    });
    this.userForm
      .get('cpassword')
      ?.setValidators([this.passwordMatchValidator.bind(this)]);
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
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.getUserProfilePic();
      this.getUserProfile();
      this.isFormTouchedOrUpdated();
    }
  }

  showSuccess(message: any) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 3000,
    });
  }

  updateUserDetails() {
    this.userForm.removeControl('cpassword');
    this.userService
      .updateUser(this.userForm.value, this.token)
      .subscribe((res: any) => {
        this.showSuccess('Profile updated successfully');
      });
  }

  uploadProfilePic() {
    this.loader = true;
    this.formData.append('profile_pic', this.croppedImage);
    this.userService
      .updateUserProfilePic(this.formData, this.token)
      .subscribe((res: any) => {
        this.getUserProfilePic();
        this.clearProPic();
        this.showSuccess('Profile Picture updated successfully');
        this.formData = new FormData();
      });
  }

  deleteProfilePic() {
    this.userService.deleteUserProfilePic(this.token).subscribe((res: any) => {
      this.getUserProfilePic();
      this.showSuccess('Profile Picture removed successfully');
    });
  }

  logout() {
    localStorage.removeItem('token');
    if (!this.deviceService.isMobile()) window.location.reload();
    else this.router.navigate(['/']);
  }

  // Check if any form control is touched or updated
  isFormTouchedOrUpdated(): boolean {
    for (const controlName in this.userForm.controls) {
      if (this.userForm.controls.hasOwnProperty(controlName)) {
        const control = this.userForm.controls[controlName];
        if (control.dirty) {
          return true;
        }
      }
    }
    return false;
  }

  getUserProfile() {
    this.userService.getUserById(this.token).subscribe({
      next: (res: any) => {
        this.me = res;
        this.userForm.patchValue({
          name: res.name,
          phone: res.phone,
        });
      },
      error: (err: HttpErrorResponse) => {
        this.router.navigate(['/']);
      },
    });
  }
  getUserProfilePic() {
    this.userService.getProfilePic(this.token).subscribe({
      next: (blob: Blob) => {
        this.convertBlobToBase64Url(blob).then((url: any) => {
          this.imageUrl = url;
          this.loader = false;
        });
      },
      error: (err: HttpErrorResponse) => {
        this.imageUrl = null;
        this.loader = false;
      },
    });
  }

  // Helper method to convert Blob to Base64 URL
  private convertBlobToBase64Url(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  profilePicOptionsSwitch() {
    this.profilePicOptions = !this.profilePicOptions;
  }

  updateProfilePicSwitch() {
    this.updateProfilePic = !this.updateProfilePic;
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
    this.profilePicOptions = false;
    this.croppedImage = null;
  }
}
