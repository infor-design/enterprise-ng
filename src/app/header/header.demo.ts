import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
    selector: 'app-header-demo',
    templateUrl: 'header.demo.html',
    standalone: false
})
export class SohoHeaderDemoComponent {
  @HostBinding('class.header') get isHeader() {
    return true;
  }
  @HostBinding('class.is-personalizable') get isPersonalizable() {
    return true;
  }
}
