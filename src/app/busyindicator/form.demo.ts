import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SohoBusyIndicatorDirective,
  SohoBusyIndicatorEvent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-busyindicator-demo',
  templateUrl:'./form.demo.html'
})
export class BusyIndicatorDemoComponent {

  message: string = 'I am waiting ... ';

  delay: number = 1000;

  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  constructor(private elementRef: ElementRef) {
  }

  start() {
    this.busyIndicator.activated = true;
  }

  stop() {
    this.busyIndicator.activated = false;
  }

  timer() {
    this.busyIndicator.activated = true;
    setTimeout((f: any) => this.busyIndicator.activated = false, 10000);
  }

  onAfterStart(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onClose(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onSubmit() {
    console.log('submit');
  }
}
