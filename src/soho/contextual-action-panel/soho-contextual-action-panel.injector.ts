import { Injector } from '@angular/core';

import { SohoContextualActionPanelRef } from './soho-contextual-action-panel.ref';

/**
 * Injects the value of the panel ref into the component on creation.
 */
export class SohoContextualActionPanelInjector implements Injector {
  /**
   * Constructor.
   *
   * @param contextualActionPanelRef
   * @param baseInjector
   */
  constructor(
    private contextualActionPanelRef: SohoContextualActionPanelRef<any>,
    private baseInjector: Injector) { }

  /**
   * Injects the correct SohoContextualActionPanelRef into the instantiated
   * component.
   *
   * @param token - the token (what is being requested)
   * @param notFoundValue - was it found ?
   */
  get(token: any, notFoundValue?: any): any {
    if (token === SohoContextualActionPanelRef) {
      return this.contextualActionPanelRef;
    }

    return this.baseInjector.get(token, notFoundValue);
  }
}
