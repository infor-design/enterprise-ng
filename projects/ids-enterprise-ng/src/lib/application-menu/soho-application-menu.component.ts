import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  NgZone,
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Application Menu Component.
 *
 * This component searches for a nav element with the attribute
 * 'soho-applcation-menu' in the parent's DOM tree, initialising those found with
 * the Soho application menu control.
 */
@Component({
  selector: 'nav[soho-application-menu]', // eslint-disable-line
  templateUrl: 'soho-application-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoApplicationMenuComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /** Breakpoint. */
  @Input() public breakpoint?: SohoApplicationMenuBreakPoint;

  /** Sets Open on resize */
  @Input() public set openOnLarge(openOnLarge: boolean | undefined) {
    this._openOnLarge = openOnLarge;

    if (this.applicationmenu) {
      this.applicationmenu.settings.openOnLarge = this._openOnLarge;
      this.updateRequired = true;
    }
  }

  public get openOnLarge(): boolean | undefined {
    if (this.applicationmenu) {
      return this.applicationmenu.settings.openOnLarge;
    }

    // If called before the component has completed
    // initialisation, return the current value from the
    // options.
    return this._openOnLarge;
  }

  /** Allows the menu to become closed after an actionable header has been selected */
  @Input() public set dismissOnClickMobile(dismissOnClickMobile: boolean | undefined) {
    this._dismissOnClickMobile = dismissOnClickMobile;

    if (this.applicationmenu) {
      this.applicationmenu.settings.dismissOnClickMobile = this._dismissOnClickMobile;
      this.updateRequired = true;
    }
  }

  public get dismissOnClickMobile() {
    if (this.applicationmenu) {
      return this.applicationmenu.settings.dismissOnClickMobile;
    }

    // If called before the component has completed
    // initialisation, return the current value from the
    // options.
    return this._dismissOnClickMobile;
  }

  /** A list of jQuery elements which trigger the openning and closing application menu. */
  @Input() public set triggers(triggers: string[]) {

    if (triggers) {
      let i = triggers.length;
      while (i--) {
        this._triggers.push(jQuery(triggers[i]));
      }

      if (this.applicationmenu) {
        this.applicationmenu.settings.triggers = this._triggers;
        this.updateRequired = true;
      }
    }
  }

  /**
   * Is the application menu filterable?
   */
  @Input() public filterable?: boolean;

  /**
   * Is the application menu resizable?
   */
  @Input() public set resizable(resizable: boolean | undefined) {
    this._resizable = resizable;
    if (this.applicationmenu) {
      this.applicationmenu.settings.resizable = this._resizable;
    }
  }

  public get resizable(): boolean | undefined {
    if (this.applicationmenu) {
      return this.applicationmenu.settings.resizable;
    }

    return this._resizable;
  }

  /**
   * Resizeable Save Position Settings
   */
  @Input() public set savePosition(savePosition: boolean | undefined) {
    this._savePosition = savePosition;
    if (this.applicationmenu) {
      this.applicationmenu.settings.resizable = this._savePosition;
    }
  }

  public get savePosition(): boolean | undefined {
    if (this.applicationmenu) {
      return this.applicationmenu.settings.savePosition;
    }

    return this._savePosition;
  }

  /**
   *
   * @param expandSwitcher
   * Menu switcher expand setting to provide callback
   */
  @Input()
  public set onExpandSwitcher(expandSwitcher: SohoApplicationMenuExpandSwitcherFunction) {
    this._onExpandSwitcher = expandSwitcher;
    if (this.applicationmenu) {
      this.applicationmenu.settings.onExpandSwitcher = this._onExpandSwitcher;
      this.updateRequired = true;
    }
  }

  /**
   *
   * @param collapseSwitcher
   * Menu switcher collapse setting to provide callback
   */
  @Input()
  public set onCollapseSwitcher(collapseSwitcher: SohoApplicationMenuCollapseSwitcherFunction) {
    this._onCollapseSwitcher = collapseSwitcher;
    if (this.applicationmenu) {
      this.applicationmenu.settings.onCollapseSwitcher = this._onCollapseSwitcher;
      this.updateRequired = true;
    }
  }

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  @HostBinding('class.application-menu') appMenu = true;

  @HostBinding('class.is-personalizable') @Input() isPersonalizable = false;

  /**
   * This will let the Soho controls bind the application menu trigger naturally
   */
  @HostBinding('id') get menuId() {
    return 'application-menu';
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private applicationmenu?: SohoApplicationMenuStatic | null;

  /** List of jQuery triggers. */
  private _triggers: Array<any> = [];

  /** Open on resize */
  private _openOnLarge?: boolean | undefined;

  /** Dismiss the menu when an item is clicked in the mobile breakpoints */
  private _dismissOnClickMobile?: boolean;

  private _resizable?: boolean;

  private _savePosition?: boolean;

  /** Menu switcher expand callback  */
  private _onExpandSwitcher?: SohoApplicationMenuExpandSwitcherFunction;

  /** Menu switcher collapse callback  */
  private _onCollapseSwitcher?: SohoApplicationMenuCollapseSwitcherFunction;

  /**
   * This event is fired when the visibility of the application menu is changed,
   * is it also called when the item is changed programmatically.
   *
   * @deprecated use accordionExpand and accordionCollapse events instead
   */
  @Output() visibility = new EventEmitter<any>();

  /**
   * This event is fired when a menu accordion is expamded
   * The event include the anchor element.
   */
  @Output() accordionExpand = new EventEmitter<any>();

  /**
   * This event is fired when a menu accordion is collapsed
   */
  @Output() accordionCollapse = new EventEmitter<boolean>();

  /** This event is fired when the visibility of the application menu is changed */
  @Output() menuVisibility = new EventEmitter<boolean>();

  /** This event is fired when the application menu is filtered. */
  @Output() filtered = new EventEmitter<any[]>();

  /** flag the need to update the soho/ep control in ngAfterViewChecked. */
  private updateRequired = false;

  // Constructor.
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Close the menu.
   */
  public closeMenu() {
    this.ngZone.runOutsideAngular(() => this.applicationmenu?.closeMenu());
  }

  /** Open the menu. */
  public openMenu(noFocus?: boolean, userOpened?: boolean, openedByClass?: boolean) {
    this.ngZone.runOutsideAngular(() => this.applicationmenu?.openMenu(noFocus, userOpened, openedByClass));
  }

  /**
   * Returns true if the menu is open, otherwise false.
   */
  public isOpen(): boolean | undefined {
    return this.ngZone.runOutsideAngular(() => this.applicationmenu?.isOpen());
  }

  /**
   * Notifies application menu that it has been updated
   */
  public updated() {
    this.ngZone.runOutsideAngular(() => this.applicationmenu?.updated());
  }

  /**
   * Closes the panel area controlled by switcher
   */
  public closeSwitcherPanel() {
    this.ngZone.runOutsideAngular(() => this.applicationmenu?.closeSwitcherPanel());
  }

  /*
   * Updates Accordion when menus have been lazily loaded
   * TODO: Ed or Tim, there doesn't appear to be a public function for something like this
   * from applicationmenu.js. This is my current work arround (Kris Holleneck)
   */
  public updateLazy(applicationMenu: SohoApplicationMenuComponent, target: any) {
    const $applicationMenu = jQuery(applicationMenu.elementRef.nativeElement).data('applicationmenu');
    const $accordion = $applicationMenu.accordion;
    const accordion = $accordion.data('accordion');

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        accordion.updated();
        const header = jQuery(target).closest('.accordion-header');
        accordion.expand(header);
      }, 1);
    });
  }

  /*
   * Toggle and select a specific header
   */
  public toggleAndSelectHeader(applicationMenu: SohoApplicationMenuComponent, header: any) {
    const $applicationMenu = jQuery(applicationMenu.elementRef.nativeElement).data('applicationmenu');
    const $accordion = $applicationMenu.accordion;
    const accordion = $accordion.data('accordion');

    accordion.headers = $accordion.find('.accordion-header');

    this.ngZone.runOutsideAngular(() => {
      accordion.updated();
      accordion.toggle(jQuery(header));
      accordion.select(jQuery(header));
    });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      const options: SohoApplicationMenuOptions = {
        breakpoint: this.breakpoint,
        dismissOnClickMobile: this._dismissOnClickMobile,
        openOnLarge: this._openOnLarge,
        triggers: this._triggers,
        filterable: this.filterable,
        resizable: this._resizable,
        savePosition: this._savePosition,
        onExpandSwitcher: this._onExpandSwitcher,
        onCollapseSwitcher: this._onCollapseSwitcher
      };

      // Initialise the SoHoXi control.
      this.jQueryElement.applicationmenu(options);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case is 'expandablearea'.
      this.applicationmenu = this.jQueryElement.data('applicationmenu');

      // Initialise any event handlers.
      this.jQueryElement
        .on('expand', (_e, results: any[]) => this.ngZone.run(() => this.accordionExpand.next(results)))
        .on('collapse', () => this.ngZone.run(() => this.accordionCollapse.next(true)))
        .on('expand', () => this.ngZone.run(() => this.visibility.next(true)))
        .on('collapse', () => this.ngZone.run(() => this.visibility.next(false)))
        .on('filtered', (_e, results: any[]) => this.ngZone.run(() => this.filtered.next(results)))
        .on('applicationmenuopen', () => this.ngZone.run(() => this.menuVisibility.next(true)))
        .on('applicationmenuclose', () => this.ngZone.run(() => this.menuVisibility.next(false)));
    });
  }

  ngAfterViewChecked() {
    if (this.applicationmenu && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.applicationmenu?.updated());
      this.updateRequired = false;
    }
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.applicationmenu) {
        this.applicationmenu.destroy();
        this.applicationmenu = null;
      }
    });
  }
}
