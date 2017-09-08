
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-ext',
  templateUrl: '../../../node_modules/@infor/sohoxi/dist/svg/svg-extended.html',
})
export class SohoIconsExtendedComponent {
  @HostBinding('style.display') none = 'none';
}
