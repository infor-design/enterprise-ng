import './vendor';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
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
  provideForms(),
  { provide: APP_BASE_HREF, useValue: '/' }
]);
