import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  Input
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Application Menu Component.
 *
 * This component searches for a nav element with the attribute
 * 'soho-applcation-menu' in the parent's DOM tree, initialising those found with
 * the Soho application menu control.
 */
@Component({
  selector: 'nav[soho-application-menu]', // tslint:disable-line
  templateUrl: './soho-application-menu.component.html'
})
export class SohoApplicationMenuComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /** Breakpoint. */
  @Input()
  public breakpoint: SohoApplicationMenuBreakPoint;

  // Sets Open on resize
  @Input()
  public set openOnLarge(openOnLarge: boolean) {
    this._openOnLarge = openOnLarge;

    if (this.applicationmenu) {
      this.applicationmenu.settings.openOnLarge = this._openOnLarge;
      this.updated();
    }
  }

  public get openOnLarge() {
    if (this.applicationmenu) {
      return this.applicationmenu.settings.openOnLarge;
    }

    // If called before the component has completed
    // initialisation, return the current value from the
    // options.
    return this._openOnLarge;
  }

  // Allows the menu to become closed after an actionable header has been selected
  @Input()
  public set dismissOnClickMobile(dismissOnClickMobile: boolean) {
    this._dismissOnClickMobile = dismissOnClickMobile;

    if (this.applicationmenu) {
      this.applicationmenu.settings.dismissOnClickMobile = this._dismissOnClickMobile;
      this.updated();
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

  // A list of jQuery elements which trigger the openning and closing
  // application menu.
  @Input()
  public set triggers(triggers: string[]) {

    if (triggers) {
      let i = triggers.length;
      while (i--) {
        this._triggers.push(jQuery(triggers[ i ]));
      }

      if (this.applicationmenu) {
        this.applicationmenu.settings.triggers = this._triggers;
        this.updated();
      }
    }
  }

  /**
   * Is the application menu filterable?
   */
  @Input()
  public filterable: boolean;

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  @HostBinding('class') get classes() {
    return 'application-menu';
  }

  /**
   * This will let the Soho controls bind the application menu trigger naturally
   */
  @HostBinding('id') get menuId() {
    return 'application-menu';
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the annotated SoHoXi control
  private applicationmenu: SohoApplicationMenuStatic;

  // List of jQuery triggers.
  private _triggers: Array<any> = [];

  // Open on resize
  private _openOnLarge: boolean;

  // Dismiss the menu when an item is clicked in the mobile breakpoints
  private _dismissOnClickMobile: boolean;

  // This event is fired when the visibility of the application menu is changed,
  // is it also called when the item is changed programmatically.
  @Output() visibility = new EventEmitter<boolean>();

  // This event is fired when the visibility of the application menu is changed
  @Output() menuVisibility = new EventEmitter<boolean>();

  // This event is fired when the application menu is filtered.
  @Output() filtered = new EventEmitter<any[]>();

  // Constructor.
  constructor(private elementRef: ElementRef) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Close the menu.
   */
  public closeMenu() {
    this.applicationmenu.closeMenu();
  }

  /** Open the menu. */
  public openMenu() {
    this.applicationmenu.openMenu();
  }

  /**
   * Returns true if the menu is open, otherwise false.
   */
  public isOpen(): boolean {
    return this.applicationmenu.isOpen();
  }

  /**
   * Notifies application menu that it has been updated
   */
  public updated() {
    this.applicationmenu.updated();
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

    setTimeout(() => {
      accordion.updated();
      const header = jQuery(target).closest('.accordion-header');
      accordion.expand(header);
    }, 1);
  }

  /*
   * Toggle and select a specific header
   */
  public toggleAndSelectHeader(applicationMenu: SohoApplicationMenuComponent, header: any) {
    const $applicationMenu = jQuery(applicationMenu.elementRef.nativeElement).data('applicationmenu');
    const $accordion = $applicationMenu.accordion;
    const accordion = $accordion.data('accordion');

    accordion.headers = $accordion.find('.accordion-header');

    setTimeout(() => {
      accordion.updated();
      accordion.toggle(jQuery(header));
      accordion.select(jQuery(header));
    }, 1);
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    const options: SohoApplicationMenuOptions = {
      breakpoint: this.breakpoint,
      dismissOnClickMobile: this._dismissOnClickMobile,
      openOnLarge: this._openOnLarge,
      triggers: this._triggers,
      filterable: this.filterable
    };

    // Initialise the SoHoXi control.
    this.jQueryElement.applicationmenu(options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'expandablearea'.
    this.applicationmenu = this.jQueryElement.data('applicationmenu');

    // Initialise any event handlers.
    this.jQueryElement
      .on('expand', () => this.visibility.next(true))
      .on('collapse', () => this.visibility.next(false))
      .on('filtered', (e, results: any[]) => this.filtered.next(results))
      .on('applicationmenuopen', () => this.menuVisibility.next(true))
      .on('applicationmenuclose', () => this.menuVisibility.next(false));
  }

  /**
   * Destructor.
   */
  public ngOnDestroy() {
    if (this.applicationmenu) {
      this.applicationmenu.destroy();
      this.applicationmenu = null;
    }
  }
}
