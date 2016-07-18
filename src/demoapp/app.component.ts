import {
  Component,
  HostBinding,
  AfterViewInit
} from '@angular/core';

import {
  ROUTER_DIRECTIVES
} from '@angular/router';

import {
  SoHoIconComponent,
  SoHoIconExtendedComponent,
  ApplicationMenuComponent
} from '../components';

import {
  SoHoInitializeDirective,
  SoHoPersonalizeDirective
} from '../directives';

import {
  MastheadDemoComponent
} from './masthead/masthead.demo';
import {
  HeaderDemoComponent
} from './header/header.demo';
import {
  ApplicationMenuDemoComponent
} from './application-menu/application-menu.demo';

@Component({
  moduleId: module.id,
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    SoHoIconComponent,
    SoHoIconExtendedComponent,
    MastheadDemoComponent,
    HeaderDemoComponent,
    ApplicationMenuDemoComponent,
    ApplicationMenuComponent,
    SoHoInitializeDirective,
    SoHoPersonalizeDirective,
    ROUTER_DIRECTIVES,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }

  ngAfterViewInit() {
  }
}
