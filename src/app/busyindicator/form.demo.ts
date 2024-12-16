import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

// @ts-ignore
import { SohoBusyIndicatorDirective, SohoBusyIndicatorEvent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-busyindicator-demo',
    templateUrl: 'form.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BusyIndicatorDemoComponent {

  message = 'I am waiting ... ';

  delay = 1000;

  transparentOverlay = false;

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator?: SohoBusyIndicatorDirective;

  constructor() {
  }

  start() {
    (this.busyIndicator as any).activated = true;
  }

  stop() {
    (this.busyIndicator as any).activated = false;
  }

  timer() {
    (this.busyIndicator as any).activated = true;
    setTimeout((_f: any) => (this.busyIndicator as any).activated = false, 10000);
  }

  onAfterStart(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onComplete(event: SohoBusyIndicatorEvent) {
      console.log(`${event.type} - ${event.event.currentTarget}`);
  }

  onSubmit() {
    this.busyIndicator?.open();
    console.log('submit');
  }
}
