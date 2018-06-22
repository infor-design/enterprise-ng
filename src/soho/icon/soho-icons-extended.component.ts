
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-ext',
  templateUrl: 'svg-extended.html',
})
export class SohoIconsExtendedComponent {
  @HostBinding('style.display') none = 'none';
}
