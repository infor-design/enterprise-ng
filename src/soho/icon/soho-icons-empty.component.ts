
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-empty',
  templateUrl: '../../../../node_modules/ids-enterprise/dist/svg/svg-empty.html',
})
export class SohoIconsEmptyComponent {
  @HostBinding('style.display') none = 'none';
}
