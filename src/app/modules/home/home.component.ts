import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  passwordHide = true;
  token: any;
  public isMobile: any;
  imageUrl: any;

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.getUserProfilePic();
    }
  }

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private userService: UserService
  ) {}

  getUserProfilePic() {
    this.userService.getProfilePic(this.token).subscribe({
      next: (blob: Blob) => {
        this.convertBlobToBase64Url(blob).then((url: any) => {
          this.imageUrl = url;
        });
      },
      error: (err: HttpErrorResponse) => {
        this.imageUrl = null;
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

  open(modalName: any) {
    this.modalService.open(modalName, { centered: true });
  }
}
