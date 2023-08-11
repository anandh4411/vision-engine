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
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    private router: Router
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
    this.formData.append('profile_pic', this.croppedImage);
    this.userService
      .updateUserProfilePic(this.formData, this.token)
      .subscribe((res: any) => {
        this.getUserProfilePic();
        this.clearProPic();
        this.showSuccess('Profile Picture updated successfully');
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
    this.router.navigate(['/']);
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

  getUserProfilePic() {
    this.userService.getProfilePic(this.token).subscribe((blob: Blob) => {
      this.convertBlobToBase64Url(blob).then((url: any) => {
        this.imageUrl = url;
      });
    });
  }
  getUserProfile() {
    this.userService.getUserById(this.token).subscribe((res: any) => {
      this.me = res;
      this.userForm.patchValue({
        name: res.name,
        phone: res.phone,
      });
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

  clearProPic() {
    this.imageChangedEvent = '';
    this.profilePicOptions = false;
  }
}
