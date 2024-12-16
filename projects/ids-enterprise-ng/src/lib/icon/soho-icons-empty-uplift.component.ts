
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
    selector: 'soho-icons-empty-uplift',
    templateUrl: 'theme-uplift-svg-empty.html',
    standalone: false
})
export class SohoIconsEmptyUpliftComponent {
  @HostBinding('style.display') none = 'none';
}
