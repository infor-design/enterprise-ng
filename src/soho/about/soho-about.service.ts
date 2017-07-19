import { Injectable } from '@angular/core';
import { SohoAboutRef } from './soho-about.ref';

/**
 * This service is used to create about dialogs.
 */
@Injectable()
export class SohoAboutService {
  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Creates a about defined by the given info, returning a reference to the
   * associated about dialog that can be interacted with.
   *
   * The about dialog won't be open until open is called on the returned instance,
   * see the about ref api for further methods.
   *
   * @parent options - a compete set of options; can be null.
   *
   * @return the about reference.
   */
  about(options?: SohoAboutOptions): SohoAboutRef {
    return new SohoAboutRef().options(options);
  }

}
