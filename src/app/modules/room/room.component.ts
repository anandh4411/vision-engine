import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('emojiPickerButton') emojiPickerButton: ElementRef | any;
  public emojiPicker:boolean = false;
  public windowModeStatus:string = 'one';
  public messageForm:any;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder){
    this.messageForm = this.formBuilder.group({
      message: [''],
    });

    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.emojiPickerButton.nativeElement && e.target !== this.emojiPickerButton.nativeElement.children[0] && e.target !== this.emojiPickerButton.nativeElement.children[1]){
        this.emojiPicker = false;
      }
    });
  }

  ngOnInit(): void {
  }

  public addEmoji(event:any){
    let data = this.messageForm.get('message');
    data.patchValue(data.value + event.emoji.native);
  }
  public emojiPickerSwitch(){
    this.emojiPicker = !this.emojiPicker;
  }
  public modeSwitch(mode:string){
    switch (mode){
      case 'one':{
        this.windowModeStatus = 'one';
        break;
      }
      case 'two':{
        this.windowModeStatus = 'two';
        break;
      }
      case 'three':{
        this.windowModeStatus = 'three';
        break;
      }
      case 'four':{
        this.windowModeStatus = 'four';
        break;
      }
      case 'five':{
        this.windowModeStatus = 'five';
        break;
      }
      case 'six':{
        this.windowModeStatus = 'six';
        break;
      }
    }
  }

}