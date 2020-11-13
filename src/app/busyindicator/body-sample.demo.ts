import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
// @ts-ignore
import { SohoBusyIndicatorDirective, SohoBusyIndicatorEvent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-busyindicator-demo',
  templateUrl: 'body-sample.demo.html'
})
export class BusyIndicatorDemoBodyComponent implements OnInit {

  message = 'Initial loading...';

  delay = 1000;

  transparentOverlay = false;
  showInitially = true;

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.showInitially = false;
      this.message = 'Timed loading...';
    }, 5000);
  }

  start() {
    (this.busyIndicator as any).activated = true;
  }

  stop() {
    (this.busyIndicator as any).activated = false;
  }

  timer() {
    this.start();
    setTimeout((_f: any) => this.stop(), 5000);
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
