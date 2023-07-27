import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isMobile: any;
  loginMethodsActive: boolean = false;
  passwordHide = true;
  cpasswordHide = true;

  constructor(private deviceService: DeviceDetectorService) {}

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
}
