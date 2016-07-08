import { provideRouter, RouterConfig } from '@angular/router';

import { ButtonDemoComponent } from './button/button.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { IconDemoComponent } from './icon/icon.demo';

export const routes: RouterConfig = [
  { path: '', component: ButtonDemoComponent },
  { path: 'button', component: ButtonDemoComponent },
  { path: 'expandablearea', component: ExpandableAreaDemoComponent },
  { path: 'icon', component: IconDemoComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
