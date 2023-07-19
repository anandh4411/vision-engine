import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwipeEvent } from 'ng-swipe';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('exit') exit: ElementRef | any;
  public activeVideoNumber: string = 'four';
  public notificationStatus: boolean = false;
  public exitStatus: boolean = false;
  public notificationType: string = 'alert';
  public isMobile: any;
  subject = new Subject<boolean>();
  public swipedDown: boolean = false;

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  onSwipeEnd(event: SwipeEvent) {
    if (event.direction === 'y' && event.distance > 0) {
      this.swipedDown = true;
      this.ref.detectChanges();
    } else if (event.direction === 'y' && event.distance < 0) {
      this.swipedDown = false;
      this.ref.detectChanges();
    }
  }

  enableNotification() {
    this.notificationStatus = !this.notificationStatus;
  }

  exitPage(exit: boolean) {
    if (exit) {
      this.subject.next(true);
      this.modalService.dismissAll();
    } else {
      this.subject.next(false);
    }
  }

  open(exit: any) {
    this.modalService.open(exit, { centered: true });
  }

  // @HostListener('window:beforeunload', ['$event'])
  // onWindowClose(event: Event) {
  //   event.preventDefault();
  //   event.returnValue = true;
  //   return false;
  // }

  public modeSwitch(mode: string) {
    switch (mode) {
      case 'one': {
        this.activeVideoNumber = 'one';
        break;
      }
      case 'two': {
        this.activeVideoNumber = 'two';
        break;
      }
      case 'three': {
        this.activeVideoNumber = 'three';
        break;
      }
      case 'four': {
        this.activeVideoNumber = 'four';
        break;
      }
      case 'five': {
        this.activeVideoNumber = 'five';
        break;
      }
      case 'six': {
        this.activeVideoNumber = 'six';
        break;
      }
    }
  }
}
