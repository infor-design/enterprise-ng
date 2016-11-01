import { Injectable } from '@angular/core';

import { SohoMessageRef } from './soho-message.ref';

/**
 * This service is used to create message dialogs.
 */
@Injectable()
export class SohoMessageService {
  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Creates a dialog defined by the given message, returning a reference to the
   * associated dialog that can be interacted with.
   *
   * The dialog won't be open until open is called on the returned instance,
   * see the message ref api for further methods.
   *
   * @parent options - a compete set of options; can be null.
   *
   * @return the message reference.
   */
  message(options?: SohoMessageOptions): SohoMessageRef {
    return new SohoMessageRef().options(options);
  }

  /**
   * Creates an error message, defined by the given options.
   *
   * The dialog won't be open until open is called on the returned instance,
   * see the message ref api for further methods.
   *
   * @return the message reference.
   */
  error(options?: SohoMessageOptions): SohoMessageRef {
    return new SohoMessageRef().options(options).isError(true);
  }
}
