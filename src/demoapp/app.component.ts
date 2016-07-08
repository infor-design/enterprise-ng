import { Component, HostBinding, AfterViewInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SoHoIcon, SoHoIconExtended } from '../components';

import { MastheadDemo } from './masthead/masthead.demo';
import { HeaderDemo } from './header/header.demo';
import { ApplicationMenuDemo } from './application-menu/application-menu.demo';

import { MastheadComponent } from '../components';
import { HeaderComponent } from '../components';
import { ApplicationMenuComponent } from '../components';

@Component({
  moduleId: module.id,
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives : [
    SoHoIcon, SoHoIconExtended, MastheadDemo, HeaderDemo, ApplicationMenuDemo, ROUTER_DIRECTIVES
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'SoHo Xi Controls in Angular 2!';

  @HostBinding('class') get classes() {
    return 'no-scroll';
  }

  ngAfterViewInit() {
    let $toolbarElement:any = $('.toolbar');
    $toolbarElement.toolbar();

    let $applicationMenuElement:any = $('.application-menu');
    $applicationMenuElement.applicationmenu({triggers: [$('.application-menu-trigger')]});
  }
}