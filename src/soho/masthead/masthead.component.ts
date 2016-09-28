import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'soho-masthead',
  templateUrl: 'masthead.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SohoMastheadComponent {
  @HostBinding('class') get classes() {
    return 'masthead';
  }

  @Input() ariaLabel: string = 'Go To Home UI Test Suite';
}
