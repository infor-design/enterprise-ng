import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-header-demo',
  templateUrl: './header.demo.html',
})
export class SohoHeaderDemoComponent {
  @HostBinding('class.header') get isHeader() { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }
}
