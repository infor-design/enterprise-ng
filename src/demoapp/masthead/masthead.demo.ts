import { Component, HostBinding } from '@angular/core';

// import { MastheadComponent } from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-masthead-demo',
  templateUrl: 'masthead.demo.html',
  // directives: [MastheadComponent],
  styles: [`
    :host {
      display:block;
    }
  `]
})
export class SohoMastheadDemoComponent {
  @HostBinding('class') get classes() {
    return 'masthead';
  }
}
