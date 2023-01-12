
import {
  Component,
  HostBinding
} from '@angular/core';

/**
 * @deprecated As of 15.0 the "new" or "colorful" icons can be used with `SohoIconsEmptyComponent` (`<soho-icons-empty icons="new | colorful">`) instead.
 */
@Component({
  selector: 'soho-icons-empty-new',
  templateUrl: 'theme-new-svg-empty.html',
})
export class SohoIconsEmptyNewComponent {
  @HostBinding('style.display') none = 'none';
}
