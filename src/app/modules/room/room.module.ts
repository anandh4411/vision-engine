import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';


@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatTabsModule,
    PickerComponent,
    EmojiComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomModule { }
