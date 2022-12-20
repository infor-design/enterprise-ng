
import {
  Component,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: 'soho-icons-empty',
  templateUrl: 'svg-empty.html',
})
export class SohoIconsEmptyComponent {
  @HostBinding('style.display') none = 'none';

  @Input() icons: SohoEmptyIconSet = 'classic';
}

export type SohoEmptyIconSet = 'classic' | 'new' | 'colorful';
