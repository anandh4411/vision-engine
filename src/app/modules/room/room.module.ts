import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatTabsModule
  ]
})
export class RoomModule { }
