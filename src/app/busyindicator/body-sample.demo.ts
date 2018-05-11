import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

import {
  SohoBusyIndicatorDirective,
  SohoBusyIndicatorEvent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-busyindicator-demo',
  templateUrl: './body-sample.demo.html'
})
export class BusyIndicatorDemoBodyComponent implements OnInit {

  message = 'Initial loading...';

  delay = 1000;

  transparentOverlay = false;
  showInitially = true;

  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.showInitially = false;
      this.message = 'Timed loading...';
    }, 5000);
  }

  start() {
    this.busyIndicator.activated = true;
  }

  stop() {
    this.busyIndicator.activated = false;
  }

  timer() {
    this.start();
    setTimeout((f: any) => this.stop(), 5000);
  }

  onAfterStart(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onComplete(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onSubmit() {
    console.log('submit');
  }
}
