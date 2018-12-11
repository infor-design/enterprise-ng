/// <reference path="soho-accordion.d.ts" />

import {
  Component,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'soho-accordion-pane',
  templateUrl: './soho-accordion-pane.component.html',
  // This assumes not expanded ... need this to be dynamic!
  styles: [`
    :host {
      display: none;
      height: 0px;`
    ]
})
export class SohoAccordionPaneComponent {
  @HostBinding('class.accordion-pane') get isAccordionPane() { return true; }

  constructor() {
    console.log(`SohoAccordionPaneComponent`);
  }
}
