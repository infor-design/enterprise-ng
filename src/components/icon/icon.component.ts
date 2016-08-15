
import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'soho-icon',
  templateUrl: 'icon.component.html',
})
export class SohoIconComponent {
  @Input() icon: string = '';
}
