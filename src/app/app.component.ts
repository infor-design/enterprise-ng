import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit, NgZone
} from '@angular/core';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';
import {
  SohoPersonalizeDirective,
  SohoRenderLoopService,
  SohoApplicationMenuComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'body', // tslint:disable-line
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ HeaderDynamicDemoRefService ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  /**
   * Local Storage Key
   */
  private static IS_APPLICATION_MENU_OPEN_KEY = 'is-application-menu-open';

  @ViewChild(SohoApplicationMenuComponent)
  public applicationMenu: SohoApplicationMenuComponent;

  @ViewChild(SohoPersonalizeDirective) personalize: SohoPersonalizeDirective;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  /**
   * Include the uplift icons only if required by the current theme, this
   * is not quite perfect, as we need to listen for the theme change here.
   * Maybe wrap all the icons into their own component?
   */
  public useUpliftIcons = false;

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(private readonly renderLoop: SohoRenderLoopService) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewInit(): void {
    if (this.isApplicationMenuOpen) {
      this.applicationMenu.openMenu(true, true);
    } else {
      console.log('close');
      this.applicationMenu.closeMenu();
    }
  }

  public get isApplicationMenuOpen(): boolean {
    const valueString = localStorage.getItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY);
    return valueString ? (valueString === 'true') : true;
  }

  public set isApplicationMenuOpen(open: boolean) {
    localStorage.setItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY, open ? 'true' : 'false');
  }

  onChangeTheme(ev: SohoChangeThemePersonalizeEvent) {
    this.useUpliftIcons = ev.theme === 'uplift';
  }

  public onMenuVisibility(visible: boolean): void {
    if (this.isApplicationMenuOpen !== visible) {
      this.isApplicationMenuOpen = visible;
    }
  }
}
