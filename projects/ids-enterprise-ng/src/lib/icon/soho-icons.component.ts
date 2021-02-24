
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons',
  templateUrl: 'theme-classic-svg.html',
})
export class SohoIconsComponent {
  @HostBinding('style.display') none = 'none';
}
