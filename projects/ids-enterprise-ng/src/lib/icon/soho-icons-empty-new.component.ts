
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-empty-new',
  templateUrl: 'theme-new-svg-empty.html',
})
export class SohoIconsEmptyNewComponent {
  @HostBinding('style.display') none = 'none';
}
