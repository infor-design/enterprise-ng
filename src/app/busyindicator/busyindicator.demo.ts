import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { SohoButtonComponent } from '../../components/button';
import { SohoBusyIndicatorComponent } from '../../components/busyindicator';

@Component({
  selector: 'busyindicator-demo',
  templateUrl: 'busyindicator.demo.html',
  directives: [ SohoButtonComponent, SohoBusyIndicatorComponent ]
})
export class BusyIndicatorDemoComponent {

  message: string = 'I am waiting ... ';

  delay: number = 1000;

  @ViewChild(SohoBusyIndicatorComponent) busyIndicator: SohoBusyIndicatorComponent;

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
}
