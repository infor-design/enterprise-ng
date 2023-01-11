
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: 'soho-icons-empty',
  templateUrl: 'svg-empty.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoIconsEmptyComponent {
  @HostBinding('style.display') none = 'none';

  /**
   * Determine which icon set should be used. The following values are accepted:
   *
   * - `"colorful"` - (default) Only use the colorful icons.
   * - `"new"` - Use the new/uplift icons. This is equivalent to the `soho-icons-empty-new` component prior to version 15.0.0.
   * - `"classic"` - Use the classic icons.
   *
   */
  @Input() icons: SohoEmptyIconSet = 'colorful';
}

export type SohoEmptyIconSet = 'classic' | 'new' | 'colorful';
