
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons',
  templateUrl: '../../../../node_modules/ids-enterprise/dist/svg/svg.html',
})
export class SohoIconsComponent {
  @HostBinding('style.display') none = 'none';
}
