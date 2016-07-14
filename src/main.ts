import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {
  disableDeprecatedForms,
  provideForms
} from '@angular/forms';

import {APP_ROUTER_PROVIDERS} from './demoapp/app.routes';
import {AppComponent} from './demoapp/app.component';
import {environment} from './environment';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,

  disableDeprecatedForms(),
  provideForms(),

  { provide: APP_BASE_HREF, useValue: '/' } // only way that routes work. using <base href> tag does not
]);
