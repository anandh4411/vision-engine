import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RoomComponent } from './modules/room/room.component';
import { RoomExitGuard } from './shared/guards/room-exit/room-exit.guard';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
