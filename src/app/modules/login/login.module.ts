import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastsContainer } from 'src/app/shared/components/toast/toasts-container.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
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
    MatProgressSpinnerModule,
    ToastsContainer,
    ComponentsModule,
  ],
})
export class LoginModule {}
