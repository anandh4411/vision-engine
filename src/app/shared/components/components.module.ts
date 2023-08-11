import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component';
import { ToastsContainer } from './toast/toasts-container.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [ModalComponent, ProfileComponent, PreloaderComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ImageCropperModule,
    NgbToastModule,
    NgIf,
    NgTemplateOutlet,
    NgFor,
    ToastsContainer,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [ModalComponent, ProfileComponent, PreloaderComponent],
})
export class ComponentsModule {}
