import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.deviceService.isMobile()) this.router.navigate(['/']);
  }
}
