import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PeerService } from 'src/app/services/peer.service';
import { Socket, io } from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit {
  socket: any;
  @ViewChild('dockMenuModalEle') dockMenuModalEle: ElementRef | any;
  @ViewChild('exit') exit: ElementRef | any;
  subject = new Subject<boolean>();
  room: string | any;

  // for preloader
  windowLoaded = false;
  apiResponded = false;
  loaderHidden = false;
  loaderTitle = 'Hold Tight..';
  // for preloader end
  public exitStatus: boolean = false;
  public swipedDown: boolean = false;
  public modalBlur: boolean = false;
  public modalBlurExit: boolean = false;
  public notificationStatus: boolean = false;
  public activeVideoNumber: number = 1;
  public notificationType: string = 'alert';
  public isMobile: any;
  public modalContent: any;
  public dockMenuModal: any;
  me: any;
  token: any;
  imageUrl: any;

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private userService: UserService,
    private router: Router,
    private peerService: PeerService
  ) {
    this.socket = this.peerService.getSocket();

    // Listen for user-joined event
    this.socket.on(
      'user-requested',
      (socketId: any, roomID: any, peerId: any) => {
        console.log(`User with ID ${peerId} joined the room`);
        // Notify the host user or update UI as needed
        this.startCall(peerId);
        this.socket.emit('added-to-call', roomID);
      }
    );

    this.socket.on('you-are-added', (roomID: any) => {
      // Notify the host user or update UI as needed
      console.log('added ' + roomID);
      // router.navigate(['/room']);
    });
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.getUserProfile();
      this.getUserProfilePic();
    }
    if (!this.getCurrentRoom()) {
      this.createRoom();
    }
  }

  createRoom() {
    // Generate a random room ID
    const roomId = 'room-' + Math.random().toString(36).substring(7);
    this.peerService.createRoom(roomId);
    this.room = roomId;
    this.socket.emit('create-room', roomId);
  }

  joinRoom(): void {
    this.socket.emit('join-room', this.room);
  }

  startCall(peerId: string) {
    this.peerService.callPeer(peerId);
  }

  getCurrentRoom(): string {
    return this.peerService.getCurrentRoom();
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

  // for switching video sizes and number of videos in layout
  public modeSwitch(mode: any) {
    this.activeVideoNumber = mode;
  }

  // mobile version -  chat, participant.. modal switch
  modalSwitch(content: any) {
    if (this.modalBlur && this.modalContent != ('' || null || content)) {
      this.modalContent = content;
    } else if (!this.modalBlur) {
      this.modalBlur = true;
      this.modalContent = content;
    } else {
      this.modalBlurExit = true;
      // we are delaying these lines of code for modal exit animation to work
      setTimeout(() => {
        this.modalBlur = false;
        this.modalBlurExit = false;
        this.modalContent = '';
      }, 300);
    }
  }

  // mobile menu option modal switch
  dockMenuModalSwitch() {
    this.dockMenuModal = !this.dockMenuModal;
  }

  // for exiting mobile menu option modal when clicked anywhere on window
  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event) {
    if (
      this.isMobile &&
      event.target !== this.dockMenuModalEle.nativeElement &&
      event.target !== this.dockMenuModalEle.nativeElement.children[0] &&
      event.target !== this.dockMenuModalEle.nativeElement.children[1]
    ) {
      this.dockMenuModal = false;
    }
  }

  // notification switch (join request, person left notification)
  enableNotification() {
    this.notificationStatus = !this.notificationStatus;
  }

  // for ngb modals to open
  open(exit: any) {
    this.modalService.open(exit, { centered: true });
  }

  // for exit page warning - works with room exit route guard
  exitPage(exit: boolean) {
    if (exit) {
      this.subject.next(true);
      this.modalService.dismissAll();
    } else {
      this.subject.next(false);
    }
  }

  // for preventing page refresh and navigation
  // @HostListener('window:beforeunload', ['$event'])
  // onWindowClose(event: Event) {
  //   event.preventDefault();
  //   event.returnValue = true;
  //   return false;
  // }

  // api consuming

  getUserProfile() {
    this.userService.getUserById(this.token).subscribe({
      next: (res: any) => {
        this.me = res;
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
          // this.loader = false;
        });
      },
      error: (err: HttpErrorResponse) => {
        this.imageUrl = null;
        // this.loader = false;
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
}
