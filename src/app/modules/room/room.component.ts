import {
  Component,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('emojiPickerButton') emojiPickerButton: ElementRef | any;
  @ViewChild('exit') exit: ElementRef | any;
  public emojiPicker: boolean = false;
  public windowModeStatus: string = 'one';
  public notificationStatus: boolean = false;
  public notificationType: string = 'alert';
  public messageForm: any;
  subject = new Subject<boolean>();

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.messageForm = this.formBuilder.group({
      message: [''],
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.emojiPickerButton.nativeElement &&
        e.target !== this.emojiPickerButton.nativeElement.children[0] &&
        e.target !== this.emojiPickerButton.nativeElement.children[1]
      ) {
        this.emojiPicker = false;
      }
    });
  }

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

  public addEmoji(event: any) {
    let data = this.messageForm.get('message');
    data.patchValue(data.value + event.emoji.native);
  }
  public emojiPickerSwitch() {
    this.emojiPicker = !this.emojiPicker;
  }
  public modeSwitch(mode: string) {
    switch (mode) {
      case 'one': {
        this.windowModeStatus = 'one';
        break;
      }
      case 'two': {
        this.windowModeStatus = 'two';
        break;
      }
      case 'three': {
        this.windowModeStatus = 'three';
        break;
      }
      case 'four': {
        this.windowModeStatus = 'four';
        break;
      }
      case 'five': {
        this.windowModeStatus = 'five';
        break;
      }
      case 'six': {
        this.windowModeStatus = 'six';
        break;
      }
    }
  }
}
