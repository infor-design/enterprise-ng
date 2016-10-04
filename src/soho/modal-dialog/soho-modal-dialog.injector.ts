import { Injector } from '@angular/core';

import { SohoModalDialogRef } from './soho-modal-dialog.ref';

/**
 * Injects the value of the dialog ref into the component on creation.
 */
export class SohoModalDialogInjector implements Injector {
  /**
   * Constructor.
   *
   * @param dialogRef - the SohoModalDialogRef to provide.
   * @param baseInjector - the base injector (for all other stuff)
   */
  constructor(
    private dialogRef: SohoModalDialogRef<any>,
    private baseInjector: Injector) { }

  /**
   * Injects the correct SohoModalDialogRef into the instantiated
   * component.
   *
   * @param token - the token (what is being requested)
   * @param notFoundValue - was it found ?
   */
  get(token: any, notFoundValue?: any): any {
    if (token === SohoModalDialogRef) {
      return this.dialogRef;
    }

    return this.baseInjector.get(token, notFoundValue);
  }
}
