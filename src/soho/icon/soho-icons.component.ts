
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'soho-icons',
  templateUrl: '../../assets/svg/svg.html',
})
export class SohoIconsComponent {
  @HostBinding('style.display') none = 'none';
}
