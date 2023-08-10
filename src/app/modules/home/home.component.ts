import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  passwordHide = true;
  public isMobile: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    console.log(localStorage.getItem('token'));
  }

  constructor(
    private modalService: NgbModal,
    private deviceService: DeviceDetectorService
  ) {}

  open(modalName: any) {
    this.modalService.open(modalName, { centered: true });
  }
}
