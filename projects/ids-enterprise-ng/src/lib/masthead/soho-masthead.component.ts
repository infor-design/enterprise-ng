import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'soho-masthead',
  templateUrl: './soho-masthead.component.html',
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

  @Input() ariaLabel = 'Go To Home UI Test Suite';
}
