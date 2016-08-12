import './vendor';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {
  disableDeprecatedForms,
  provideForms
} from '@angular/forms';

import {APP_ROUTER_PROVIDERS, AppComponent, environment} from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
]);
