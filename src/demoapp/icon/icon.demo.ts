import {
  Component
} from '@angular/core';

import {
  SohoButtonComponent,
  SohoIconComponent
} from '../.';

@Component({
  moduleId: module.id,
  selector: 'soho-icon-demo',
  templateUrl: 'icon.demo.html',
  directives: [ SohoButtonComponent, SohoIconComponent ]
})
export class IconDemoComponent {
}
