import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  subject = new Subject<boolean>();
  passwordHide = true;
  cpasswordHide = true;
  fileUploadQueue: any;
  public uploading: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  loginMethodsActive: boolean = false;
  public isMobile: any;

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  changeMethod() {
    this.loginMethodsActive = !this.loginMethodsActive;
  }

  exitPage(modalName: boolean) {
    if (modalName) {
      this.subject.next(true);
      this.modalService.dismissAll();
    } else {
      this.subject.next(false);
    }
  }

  open(modalName: any) {
    this.modalService.open(modalName, { centered: true });
  }

  uploadProPic() {
    this.uploading = !this.uploading;
  }

  // image crop
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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
  }
  proPicDone() {}

  onFileDropped(event: any) {
    this.imageChangedEvent = { target: { files: [event[0]] } };
  }
}
