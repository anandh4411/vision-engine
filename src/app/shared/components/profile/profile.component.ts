import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  passwordHide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
