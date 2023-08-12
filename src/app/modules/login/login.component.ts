import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('loginFailed') loginFailed: ElementRef | any;
  // for preloader
  windowLoaded = false;
  apiResponded = false;
  loaderHidden = false;
  loaderTitle = 'Login';
  // for preloader end
  loader = false;
  loginMethodsActive = false;
  passwordHide = true;
  cpasswordHide = true;
  public isMobile: any;
  public userForm: FormGroup;

  constructor(
    private deviceService: DeviceDetectorService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public toastService: ToastService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}'),
        ],
      ],
      password: ['', [Validators.required, Validators.min(10000000)]],
    });
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

  // for preloader
  ngAfterViewInit() {
    setTimeout(() => {
      this.windowLoaded = true;
    }, 1000);
  }
  checkLoaded(loaded: any) {
    if (loaded == 'true') this.loaderHidden = true;
  }
  // for preloader end

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  showDanger(template: any) {
    this.toastService.show(template, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  login() {
    Object.keys(this.userForm.controls).forEach((controlName) => {
      this.userForm.get(controlName)?.markAsTouched();
    });
    if (this.userForm.valid) {
      this.userService.loginUser(this.userForm.value).subscribe({
        next: (res: any) => {
          this.loader = false;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.showDanger(this.loginFailed);
        },
      });
    }
  }
  changeMethod() {
    this.loginMethodsActive = !this.loginMethodsActive;
  }
}
