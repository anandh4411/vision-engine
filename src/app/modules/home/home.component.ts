import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
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
  public isMobile: any;
  imageUrl: any;
  token: any;
  passwordHide = true;
  // for preloader
  windowLoaded = false;
  apiResponded = false;
  loaderHidden = false;
  // for preloader end

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.getUserProfilePic();
  }

  // for preloader
  checkLoaded(loaded: any) {
    if (loaded == 'true') this.loaderHidden = true;
  }
  // for preloader end

  getUserProfilePic() {
    this.userService.getProfilePic(this.token).subscribe({
      next: (blob: Blob) => {
        this.convertBlobToBase64Url(blob).then((url: any) => {
          this.imageUrl = url;
          this.apiResponded = true;
        });
      },
      error: (err: HttpErrorResponse) => {
        this.imageUrl = null;
        this.apiResponded = true;
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
