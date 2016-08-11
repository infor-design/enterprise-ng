import {
  Injectable
} from '@angular/core';

export type SohoToastPositionType
  = 'top right' | 'top left' | 'bottom left' | 'bottom right';

@Injectable()
export class SohoToastService {
  public static TOP_LEFT: SohoToastPositionType =  'top right';
  public static TOP_RIGHT: SohoToastPositionType = 'top left';
  public static BOTTOM_LEFT: SohoToastPositionType =  'bottom left';
  public static BOTTOM_RIGHT: SohoToastPositionType = 'bottom right';

  /**
   * Show a toast using the specified options.
   */
  show(options: SohoToastOptions): void {
    jQuery('body').toast(options).show();
  }
}
