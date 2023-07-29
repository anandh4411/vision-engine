import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private modalService: NgbModal) {}

  open(modalName: any) {
    this.modalService.open(modalName, { centered: true });
  }
}
