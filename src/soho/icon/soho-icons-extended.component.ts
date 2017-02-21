
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'soho-icons-ext',
  templateUrl: '../../assets/svg/svg-extended.html',
})
export class SohoIconsExtendedComponent {
  @HostBinding('style.display') none = 'none';
}
