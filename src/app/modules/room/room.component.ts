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

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit {
  @ViewChild('dockMenuModalEle') dockMenuModalEle: ElementRef | any;
  @ViewChild('exit') exit: ElementRef | any;
  subject = new Subject<boolean>();
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

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
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
}
