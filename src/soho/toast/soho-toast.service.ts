import { Injectable } from '@angular/core';

@Injectable()
export class SohoToastService {
  public static TOP_LEFT: SohoToastPosition =  'top left';
  public static TOP_RIGHT: SohoToastPosition = 'top right';
  public static BOTTOM_LEFT: SohoToastPosition =  'bottom left';
  public static BOTTOM_RIGHT: SohoToastPosition = 'bottom right';

  /**
   * Show a toast using the specified options.
   */
  show(options: SohoToastOptions): void {
    jQuery('body').toast(options).show();
  }
}
