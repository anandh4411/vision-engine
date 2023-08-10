import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { ToastsContainer } from '../../shared/components/toast/toasts-container.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    ImageCropperModule,
    DirectivesModule,
    MatProgressSpinnerModule,
    ToastsContainer,
  ],
})
export class SignupModule {}
