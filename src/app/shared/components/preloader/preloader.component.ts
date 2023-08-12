import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent implements OnInit, OnChanges {
  @Output() loadedEvent = new EventEmitter<string>();
  @Input() windowLoaded = false;
  @Input() apiResponded: boolean = false;
  @Input() noApi: boolean = false;
  @Input() title: string = '';
  progressValue = 0;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.windowLoaded && (this.noApi || this.apiResponded)) {
      this.startLoader();
    }
  }

  startLoader() {
    const interval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue >= 100) {
        clearInterval(interval);
        this.loadedEvent.emit('true');
      }
    }, 100);
  }
}
