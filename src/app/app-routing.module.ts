import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RoomComponent } from './modules/room/room.component';
import { RoomExitGuard } from './shared/guards/room-exit/room-exit.guard';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'room',
    component: RoomComponent,
    loadChildren: () =>
      import('./modules/room/room.module').then((m) => m.RoomModule),
    canDeactivate: [RoomExitGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    component: SignupComponent,
    loadChildren: () =>
      import('./modules/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
