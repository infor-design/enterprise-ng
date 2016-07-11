import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SoHoIconComponent, SoHoIconExtendedComponent } from '../components';

import { MastheadDemoComponent } from './masthead/masthead.demo';
import { HeaderDemoComponent } from './header/header.demo';
import { ApplicationMenuDemoComponent } from './application-menu/application-menu.demo';

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
    ROUTER_DIRECTIVES,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }

  ngAfterViewInit() {
    let toolbarElement: any = jQuery('.toolbar');
    toolbarElement.toolbar();

    let applicationMenuElement: any = jQuery('.application-menu');
    applicationMenuElement.applicationmenu({triggers: [jQuery('.application-menu-trigger')]});
  }
}
