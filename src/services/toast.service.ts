import {
  Injectable
} from '@angular/core';

export const TOAST_POSITION = {
  TOP_LEFT: 'top right',
  TOP_RIGHT: 'top left',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_RIGHT: 'bottom right'
};

export type ToastPositionType
  = 'top right' | 'top left' | 'bottom left' | 'bottom right';

@Injectable()
export class SoHoToastService {

  /**
   * Show a toast using the specified options.
   */
  show(options: SoHoToastOptions): void {
    jQuery('body').toast(options).show();
  }
}
