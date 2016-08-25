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
  SohoIconsExtendedComponent
} from '../components/icon';
import {
  SohoApplicationMenuComponent
} from '../components/application-menu';
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
  SohoApplicationMenuDemoComponent
} from './application-menu/application-menu.demo';
import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';

@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  directives: [
    SohoIconsComponent,
    SohoIconsExtendedComponent,
    SohoMastheadDemoComponent,
    SohoHeaderDynamicDemoComponent,
    SohoApplicationMenuDemoComponent,
    SohoApplicationMenuComponent,
    SohoPersonalizeDirective,
    ROUTER_DIRECTIVES,
  ],
  // precompile: (<any[]>routes.map((route) => {
  //   return route.component;
  // })),
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SohoApplicationMenuComponent) applicationMenu: SohoApplicationMenuComponent;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  ngAfterViewInit() {
    ArgumentHelper.checkInputNotNull('AppComponent', 'applicationMenu', this.applicationMenu);

    // @todo I do not like this code.
    this.applicationMenu.triggers = [ jQuery('.application-menu-trigger') ];
  }
}
