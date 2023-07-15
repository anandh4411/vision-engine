import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  @Input() notificationStatus: any;
  @ViewChild('emojiPickerButton') emojiPickerButton: ElementRef | any;
  public emojiPicker: boolean = false;
  public messageForm: any;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {
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

  public addEmoji(event: any) {
    let data = this.messageForm.get('message');
    data.patchValue(data.value + event.emoji.native);
  }
  public emojiPickerSwitch() {
    this.emojiPicker = !this.emojiPicker;
  }
}
