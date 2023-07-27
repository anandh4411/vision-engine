import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropFileDirective } from './drag-drop-file/drag-drop-file.directive';

@NgModule({
  declarations: [DragDropFileDirective],
  imports: [CommonModule],
  exports: [DragDropFileDirective],
})
export class DirectivesModule {}
