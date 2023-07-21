import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwipeModule } from 'ng-swipe';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { RecordingComponent } from './components/recording/recording.component';
import { CallActionsComponent } from './components/call-actions/call-actions.component';
import { VideoBottomBarComponent } from './components/video-bottom-bar/video-bottom-bar.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ChatsComponent } from './components/chats/chats.component';
import { VideoComponent } from './components/video/video.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NotificationComponent } from './components/notification/notification.component';
import { ModalBlurredCommonComponent } from './components/modal-blurred-common/modal-blurred-common.component';

@NgModule({
  declarations: [
    RoomComponent,
    RecordingComponent,
    CallActionsComponent,
    VideoBottomBarComponent,
    ParticipantsComponent,
    ChatsComponent,
    VideoComponent,
    NotificationComponent,
    ModalBlurredCommonComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MatTabsModule,
    PickerComponent,
    EmojiComponent,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SwipeModule,
  ],
})
export class RoomModule {}
