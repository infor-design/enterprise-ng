
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-empty',
  templateUrl: 'svg-empty.html',
})
export class SohoIconsEmptyComponent {
  @HostBinding('style.display') none = 'none';
}
