
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
    selector: 'soho-icons-uplift',
    templateUrl: 'theme-new-svg.html',
    standalone: false
})
export class SohoIconsUpliftComponent {
  @HostBinding('style.display') none = 'none';
}
