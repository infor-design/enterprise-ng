import { Component, HostBinding } from '@angular/core';

import {
  SohoHeaderComponent,
  SohoButtonComponent
} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-header-demo',
  templateUrl: 'header.demo.html',
  directives: [ SohoHeaderComponent, SohoButtonComponent ]
})
export class HeaderDemoComponent {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }
}
