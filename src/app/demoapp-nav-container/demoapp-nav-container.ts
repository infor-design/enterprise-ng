import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  Output,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

// @ts-ignore
import {
  SohoApplicationMenuComponent,
  SohoModuleNavContainerComponent,
  SohoModuleNavComponent
} from 'ids-enterprise-ng';

import {
  ApplicationMenuDemoComponent
} from '../application-menu/application-menu.demo';

import {
  ModuleNavDemoComponent
} from '../module-nav/module-nav.demo';

type DemoappMenuStyle = 'application-menu' | 'module-nav';

const APP_MENU = 'application-menu';
const MODULE_NAV = 'module-nav';

@Component({
  selector: 'demoapp-nav-container', // eslint-disable-line
  templateUrl: 'demoapp-nav-container.html',
  encapsulation: ViewEncapsulation.None
})
export class DemoappNavContainerComponent implements AfterViewInit {
  /** Local Storage Keys */
  private static IS_APPLICATION_MENU_OPEN_KEY = 'is-application-menu-open';
  private readonly MENU_TYPE_KEY = 'ids-ng-demoapp-menu-type';
  private readonly MODULE_NAV_DISPLAY_MODE_KEY = 'ids-ng-demoapp-module-nav-display-mode';

  private jQueryElement!: JQuery | undefined;

  @Output() moduleNavIsExpanded = new EventEmitter<boolean>();

  /** App Menu component refs */
  @ViewChild(SohoApplicationMenuComponent, { static: true })
  public applicationMenu?: SohoApplicationMenuComponent;

  /** Module Nav component refs */
  @ViewChild(SohoModuleNavContainerComponent, { static: true })
  public moduleNavContainer?: SohoModuleNavContainerComponent;
  @ViewChild(SohoModuleNavComponent, { static: true })
  public moduleNav?: SohoModuleNavComponent;

  @HostBinding('class.no-scroll') get isNoScroll() {
    return true;
  }

  constructor(private element: ElementRef, private ngZone: NgZone) {
    this.moduleNavDisplayMode = 'expanded';
  }

  /**
   * Returns the currently selected main menu component type,
   * defaulting to a sensible default color if one is not yet set.
   */
  public get menuType(): DemoappMenuStyle {
    const menuType = localStorage.getItem(this.MENU_TYPE_KEY) as DemoappMenuStyle | undefined;
    return menuType ? menuType : APP_MENU;
  }

  /**
   * Set the current main menu component type,
   * storing it such that it perists between sessions.
   */
  public set menuType(menuType: DemoappMenuStyle | string) {
    if (menuType === '') {
      localStorage.removeItem(this.MENU_TYPE_KEY);
      return;
    }
    localStorage.setItem(this.MENU_TYPE_KEY, menuType);
  }

  /**
   * Returns the currently selected Module Nav Display Mode,
   * defaulting to a sensible default setting if one is not yet set.
   */
  public get moduleNavDisplayMode(): SohoModuleNavDisplayMode {
    const displayMode = localStorage.getItem(this.MODULE_NAV_DISPLAY_MODE_KEY) as SohoModuleNavDisplayMode;
    if (displayMode && ['collapsed', 'expanded'].includes(displayMode)) {
      return displayMode;
    }
    return false;
  }

  /**
   * Set the current Module Nav display mode,
   * storing it such that it perists between sessions.
   */
  public set moduleNavDisplayMode(displayMode: SohoModuleNavDisplayMode) {
    if (!displayMode) {
      localStorage.removeItem(this.MODULE_NAV_DISPLAY_MODE_KEY);
    } else {
      localStorage.setItem(this.MODULE_NAV_DISPLAY_MODE_KEY, displayMode);
    }

    if (this.moduleNavContainer) {
      this.moduleNav?.updated({ displayMode });
    }
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Module Nav Component events
      if (this.moduleNavContainer) {
        this.jQueryElement
          .on('click', '.application-menu-trigger', (e: any) => {
            debugger;
            const target = (e.target);
            if (this.moduleNavDisplayMode === 'collapsed') this.moduleNavDisplayMode = 'expanded';
            else this.moduleNavDisplayMode = 'collapsed';
          });
      }
    });

    /**
     * Note: If using an input like [triggers]="[ '.application-menu-trigger' ]"
     * hookup the app menu trigger once the afterViewInit is called. This will
     * ensure that the toolbar has had a chance to create the application-menu-trugger
     * button.
     * this.applicationMenu.triggers = [ '.application-menu-trigger' ];
     */
    if (this.applicationMenu) {
      if (this.isApplicationMenuOpen) {
        this.applicationMenu?.openMenu(true, true);
      } else {
        this.applicationMenu?.closeMenu();
      }
    }

    /**
     * Configures the demo app's Module Nav, if one is present
     */
    if (this.moduleNavContainer) {
      if (this.moduleNavDisplayMode) {
        this.moduleNav?.updated({ displayMode: this.moduleNavDisplayMode });
      }
    }
  }

  public get isApplicationMenuOpen(): boolean {
    const valueString = localStorage.getItem(DemoappNavContainerComponent.IS_APPLICATION_MENU_OPEN_KEY);
    return valueString ? (valueString === 'true') : true;
  }

  public set isApplicationMenuOpen(open: boolean) {
    localStorage.setItem(DemoappNavContainerComponent.IS_APPLICATION_MENU_OPEN_KEY, open ? 'true' : 'false');
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {

  }

  public onMenuVisibility(visible: boolean): void {
    if (this.isApplicationMenuOpen !== visible) {
      this.isApplicationMenuOpen = visible;
    }
  }
}
