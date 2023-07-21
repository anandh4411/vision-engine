import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-blurred-common',
  templateUrl: './modal-blurred-common.component.html',
  styleUrls: ['./modal-blurred-common.component.scss'],
})
export class ModalBlurredCommonComponent {
  @Input() isMobile: any;
  @Input() modalBlur: any;
  @Input() modalBlurExit: any;
  @Input() modalContent: any;
}
