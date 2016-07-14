import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { SoHoButtonComponent } from '../';

import { SoHoBusyIndicatorComponent } from '../';

@Component({
    moduleId: module.id,
    selector: 'busyindicator-demo',
    templateUrl: 'busyindicator-demo.component.html',
    directives: [ SoHoButtonComponent, SoHoBusyIndicatorComponent ]
})
export class BusyIndicatorDemoComponent {

    message: string = 'I am waiting ... ';

    delay: number = 1000;

    @ViewChild(SoHoBusyIndicatorComponent) busyIndicator: SoHoBusyIndicatorComponent;

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
