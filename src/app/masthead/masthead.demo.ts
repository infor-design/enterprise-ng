import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'soho-masthead-demo',
  templateUrl: './masthead.demo.html',
})
export class SohoMastheadDemoComponent {
  @HostBinding('class.masthead') get isMasthead() { return true; }
  @HostBinding('style.display') get isDisplayBlock() { return 'block'; }
}
