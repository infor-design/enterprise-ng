import { Component, HostBinding } from '@angular/core';

import {
  HeaderComponent,
  SoHoButtonComponent
} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-header-demo',
  templateUrl: 'header.demo.html',
  directives: [ HeaderComponent, SoHoButtonComponent ]
})
export class HeaderDemoComponent {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }
}
