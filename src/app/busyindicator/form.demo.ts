import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  SohoBusyIndicatorDirective,
  SohoBusyIndicatorEvent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-busyindicator-demo',
  templateUrl: './form.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusyIndicatorDemoComponent {

  message = 'I am waiting ... ';

  delay = 1000;

  transparentOverlay = false;

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

  onComplete(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onSubmit() {
    this.busyIndicator.open();
    console.log('submit');
  }
}
