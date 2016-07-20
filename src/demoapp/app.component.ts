import {
  Component,
  HostBinding,
  AfterViewInit,
  ViewChild
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
    SoHoPersonalizeDirective,
    ROUTER_DIRECTIVES,
  ],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ApplicationMenuComponent) applicationMenu: ApplicationMenuComponent;

  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }

  ngAfterViewInit() {
    // @todo I do not like this code.
    this.applicationMenu.triggers = [ jQuery('.application-menu-trigger') ];
  }
}
