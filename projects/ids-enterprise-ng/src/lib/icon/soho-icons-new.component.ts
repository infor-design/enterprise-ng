
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-new',
  templateUrl: 'theme-new-svg.html',
})
export class SohoIconsNewComponent {
  @HostBinding('style.display') none = 'none';
}
