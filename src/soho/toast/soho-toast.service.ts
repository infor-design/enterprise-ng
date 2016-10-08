import { Injectable } from '@angular/core';

@Injectable()
export class SohoToastService {
  public static TOP_LEFT: SohoToastOptionsPosition =  'top left';
  public static TOP_RIGHT: SohoToastOptionsPosition = 'top right';
  public static BOTTOM_LEFT: SohoToastOptionsPosition =  'bottom left';
  public static BOTTOM_RIGHT: SohoToastOptionsPosition = 'bottom right';

  /**
   * Show a toast using the specified options.
   */
  show(options: SohoToastOptions): void {
    jQuery('body').toast(options).show();
  }
}
