import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

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
    private router: Router,
    private renderer: Renderer2
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
    let img = new window.Image();
    if (img.onload) this.windowLoaded = true;
    document.onreadystatechange = () => {
      if (document.readyState !== 'complete') {
        console.log('loading..');
      } else {
        console.log('loaded');
        // Now setting the windowLoaded variable within the component's context
      }
    };
  }
  ngAfterViewInit() {
    // Use the Renderer2 to add an event listener for the "load" event on the window
    const loadListener = this.renderer.listen('window', 'load', () => {
      console.log('Window fully loaded');
      this.windowLoaded = true;
      // Perform actions or trigger functions here once the window is fully loaded
      // Cleanup: Remove the event listener after it has been executed
      loadListener();
    });
  }
  // for preloader
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
