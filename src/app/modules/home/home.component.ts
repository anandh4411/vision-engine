import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Socket, io } from 'socket.io-client';
import { PeerService } from 'src/app/services/peer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  socket: any;
  public isMobile: any;
  imageUrl: any;
  token: any;
  passwordHide = true;
  // for preloader
  windowLoaded = false;
  apiResponded = false;
  loaderHidden = false;
  loaderTitle = 'Vision Engine';
  // for preloader end
  public meetingForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private peerService: PeerService
  ) {
    this.meetingForm = this.formBuilder.group({
      meeting_url: ['', [Validators.required]],
    });
    this.socket = this.peerService.getSocket();

    // Listen for user-joined event
    this.socket.on('you-are-added', (roomID: any) => {
      console.log(`User with ID ${roomID} joined the room`);
      // Notify the host user or update UI as needed
      console.log('added');
    });
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
    this.getUserProfilePic();
    this.handleRouteChange();
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

  requestJoin() {
    Object.keys(this.meetingForm.controls).forEach((controlName) => {
      this.meetingForm.get(controlName)?.markAsTouched();
    });
    if (this.meetingForm.valid) {
      const roomId = this.meetingForm.get('meeting_url')?.value;
      const peerId = this.peerService.getPeerId();
      this.socket.emit('request-join-room', roomId, peerId);
      this.joinRoom(roomId);
      this.router.navigate(['/room']);
      console.log(roomId + ',' + peerId);
    }
  }

  joinRoom(roomId: string) {
    this.peerService.joinRoom(roomId);
  }
}
