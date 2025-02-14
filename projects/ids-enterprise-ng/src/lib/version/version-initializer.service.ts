import { Injectable } from '@angular/core';

/**
 * Initialise the locale service BEFORE the root application component is
 * loaded.  Simply add the module to the root module, and the initialiser
 * will be automatically added.
 */
@Injectable({
  providedIn: 'root'
})
export class SohoVersionInitializerService {
  private static readonly VERSION_ATTR_NAME = 'data-ids-enterprise-ng-version';

  /**
   * Initializes the version attribute.
   */
  initialize() {
    $('html').attr(SohoVersionInitializerService.VERSION_ATTR_NAME, '19.1.0');
  }
}

export function SohoVersionInitializerFactory(service: SohoVersionInitializerService) {
  return () => service.initialize();
}
