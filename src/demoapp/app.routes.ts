import { provideRouter, RouterConfig } from '@angular/router';

import { ExpandableAreaDemo } from './expandablearea/expandablearea.demo';
import { IconDemo } from './icon/icon.demo';

export const routes: RouterConfig = [
  { path: 'expandablearea', component: ExpandableAreaDemo },
  { path: 'icon', component: IconDemo },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
