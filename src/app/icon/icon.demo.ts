import {
  Component
} from '@angular/core';

import { SohoIconComponent } from '../../components/icon';
import { SohoButtonComponent } from '../../components/button';

@Component({
  selector: 'soho-icon-demo',
  templateUrl: 'icon.demo.html',
  directives: [ SohoButtonComponent, SohoIconComponent ]
})
export class IconDemoComponent {
}
