import { Component, HostBinding } from '@angular/core';

import {
  SohoHeaderComponent,
  SohoButtonComponent,
  TOOLBAR_DIRECTIVES
} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-header-demo',
  templateUrl: 'header.demo.html',
  directives: [ SohoHeaderComponent, SohoButtonComponent, TOOLBAR_DIRECTIVES ]
})
export class SohoHeaderDemoComponent {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }
}
