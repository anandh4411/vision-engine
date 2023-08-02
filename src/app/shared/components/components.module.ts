import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ModalComponent, ProfileComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
  ],
  exports: [ModalComponent, ProfileComponent],
})
export class ComponentsModule {}
