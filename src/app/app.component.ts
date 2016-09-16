import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { SohoApplicationMenuComponent } from '../components/application-menu';

import { ArgumentHelper } from '../utils';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';

@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  // precompile: (<any[]>routes.map((route) => {
  //   return route.component;
  // })),
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SohoApplicationMenuComponent) applicationMenu: SohoApplicationMenuComponent;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  constructor() {
    // Set the locale here, to ensure all the values are setup.
    Locale.set('en-US');
  }

  ngAfterViewInit() {
    ArgumentHelper.checkInputNotNull('AppComponent', 'applicationMenu', this.applicationMenu);

    // @todo I do not like this code.
    this.applicationMenu.triggers = [ jQuery('.application-menu-trigger') ];
  }
}
