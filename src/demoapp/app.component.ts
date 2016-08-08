import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  ROUTER_DIRECTIVES
} from '@angular/router';

import {
  SohoIconComponent,
  SohoIconExtendedComponent,
  SohoApplicationMenuComponent
} from '../components';

import {
  ArgumentHelper
} from '../utils';

import {
  SohoPersonalizeDirective
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
import {
  routes
} from './app.routes';

@Component({
  moduleId: module.id,
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    SohoIconComponent,
    SohoIconExtendedComponent,
    MastheadDemoComponent,
    HeaderDemoComponent,
    ApplicationMenuDemoComponent,
    SohoApplicationMenuComponent,
    SohoPersonalizeDirective,
    ROUTER_DIRECTIVES,
  ],
  precompile: (<any[]>routes.map((route) => {
    return route.component;
  })),
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SohoApplicationMenuComponent) applicationMenu: SohoApplicationMenuComponent;

  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }

  ngAfterViewInit() {
    ArgumentHelper.checkInputNotNull('AppComponent', 'applicationMenu', this.applicationMenu);

    // @todo I do not like this code.
    this.applicationMenu.triggers = [ jQuery('.application-menu-trigger') ];
  }
}
