import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  subject = new Subject<boolean>();
  passwordHide = true;
  cpasswordHide = true;
  fileUploadQueue: any;

  constructor(private modalService: NgbModal) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
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
}
