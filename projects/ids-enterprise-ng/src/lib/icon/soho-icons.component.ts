
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons',
  templateUrl: 'svg.html',
})
export class SohoIconsComponent {
  @HostBinding('style.display') none = 'none';
}
