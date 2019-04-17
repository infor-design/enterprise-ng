import { Injectable } from '@angular/core';

// @todo unable to load the version from a file not included as a module in the package.
// const version = require('../../../../package.json').version;
// const version = process.env.npm_package_version;
const version = '5.2.1';

/**
 * Initialise the locale service BEFORE the root application component is
 * loaded.  Simply add the module to the root module, and the initialiser
 * will be automatically added.
 */
@Injectable({
  providedIn: 'root'
})
export class SohoVersionInitializerService {
  private readonly VERSION_ATTR_NAME = 'data-ids-enterprise-ng-version';

  /**
   * Initializes the version attribute.
   */
  initialize() {
    $('html').attr(this.VERSION_ATTR_NAME, version);
  }
}

export function SohoVersionInitializerFactory(service: SohoVersionInitializerService) {
    return () => service.initialize();
}
