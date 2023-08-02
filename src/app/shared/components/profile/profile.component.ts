import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  passwordHide = true;
  public profilePicOptions: boolean = false;
  public updateProfilePic: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('profilePicOptionsElem') emojiPickerButton: ElementRef | any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   if (
    //     e.target !== this.emojiPickerButton.nativeElement &&
    //     e.target !== this.emojiPickerButton.nativeElement.children[0] &&
    //     e.target !== this.emojiPickerButton.nativeElement.children[1] &&
    //     e.target !== this.emojiPickerButton.nativeElement.children[2]
    //   ) {
    //     this.profilePicOptions = false;
    //   }
    // });
  }

  profilePicOptionsSwitch() {
    this.profilePicOptions = !this.profilePicOptions;
  }

  updateProfilePicSwitch() {
    this.updateProfilePic = !this.updateProfilePic;
  }

  // image crop
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log('image changed');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  // image crop end
  clearProPic() {
    this.imageChangedEvent = '';
    this.profilePicOptions = false;
  }
}
