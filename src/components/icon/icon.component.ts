
import {
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'soho-icon',
  templateUrl: 'icon.component.html',
})
export class SohoIconComponent {
  @Input() icon: string = '';
}
