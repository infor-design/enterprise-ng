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
  SohoIconsComponent,
  SohoIconsExtendedComponent,
  SohoApplicationMenuComponent,
  SohoHeaderComponentRefService,
} from '../components';
import {
  ArgumentHelper
} from '../utils';
import {
  SohoPersonalizeDirective
} from '../directives';
import {
  SohoMastheadDemoComponent
} from './masthead/masthead.demo';
import {
  SohoHeaderDemoComponent
} from './header/header.demo';
import {
  SohoApplicationMenuDemoComponent
} from './application-menu/application-menu.demo';
import {
  routes
} from './app.routes';

@Component({
  moduleId: module.id,
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ SohoHeaderComponentRefService ],
  directives: [
    SohoIconsComponent,
    SohoIconsExtendedComponent,
    SohoMastheadDemoComponent,
    SohoHeaderDemoComponent,
    SohoApplicationMenuDemoComponent,
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

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  private activeViewName = 'SoHo Xi Controls in Angular 2!'; // tslint:disable-line

  ngAfterViewInit() {
    ArgumentHelper.checkInputNotNull('AppComponent', 'applicationMenu', this.applicationMenu);

    // @todo I do not like this code.
    this.applicationMenu.triggers = [ jQuery('.application-menu-trigger') ];
  }
}
