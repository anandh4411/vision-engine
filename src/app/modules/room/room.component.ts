import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('exit') exit: ElementRef | any;
  public activeVideoNumber: string = 'one';
  public notificationStatus: boolean = false;
  public notificationType: string = 'alert';
  subject = new Subject<boolean>();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

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
