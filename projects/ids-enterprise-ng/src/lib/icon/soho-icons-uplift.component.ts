
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-uplift',
  templateUrl: 'theme-uplift-svg.html',
})
export class SohoIconsUpliftComponent {
  @HostBinding('style.display') none = 'none';
}
