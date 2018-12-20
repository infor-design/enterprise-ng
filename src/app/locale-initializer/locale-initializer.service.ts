import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { extend } from 'jquery';
import { APP_BASE_HREF } from '@angular/common';

export interface Translation {
  id: string;
  value: string;
  comment: string;
}

/**
 * Initialise the locale service BEFORE the root application component is
 * loaded.  Simply add the module to the root module, and the initialiser
 * will be automatically added.
 */
@Injectable({
  providedIn: 'root'
})
export class LocaleInitializerService {
  /**
   * Constructor.
   *
   * @param locale the locale being displayed.
   * @param baseHref the base url of the web app
   */
  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    @Inject(APP_BASE_HREF) private readonly baseHref: string) {
      console.log(`locale=${locale}, baseHref=${baseHref}`);
    }

  /**
   * Initializes the locale for this web application.
   */
  async initialize() {
    Soho.Locale.culturesPath = `${this.baseHref}assets/ids-enterprise/js/cultures/`;

    // Wait for the locales to be loaded before starting the
    // application.
    await Soho.Locale.set(this.locale).done(() => {
      // This is a good place to load any additional translations to
      // augment those provided by the enterprise controls.

      const base = Soho.Locale.cultures[this.locale];

      // This is an example of extending the resources provided by
      // the enterprise controls, and made available to the sohoTranslate
      // pipe.  These can be loaded explicitly, or via an http
      // call to the backend.
      const translations: Translation[] = []; // <-- set this to the additional translations
      translations['QuickStartButtonText'] = {
        id: 'QuickStartButtonText',
        value: 'Click Me!',
        comment: ''
      };

      // ... once loaded (async if required), merge the translations into the core set.
      Soho.Locale.cultures[this.locale] = extend(true, {}, base, {
        messages: translations
      });

      console.log('Enterprise Locale Initialised.');
    });
  }
}

export function LocaleInitializerFactory(service: LocaleInitializerService) {
    return () => service.initialize();
}
