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
  templateUrl: 'soho-application-menu.component.html'
})
export class SohoApplicationMenuComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /** Breakpoint. */
  @Input()
  public breakpoint: SohoApplicationMenuOptionsBreakPoint;

  // Open on resize?
  @Input()
  public openOnLarge: boolean;

  // A list of jQuery elements which trigger the openning and closing
  // application menu.
  @Input()
  public set triggers(triggers: string[]) {

    if (triggers) {
      let i = triggers.length;
      while (i--) {
        this._triggers.push(jQuery(triggers[i]));
      }

      if (this.applicationmenu) {
        this.applicationmenu.settings.triggers = this._triggers;
        this.updated();
      }
    }
  }

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  @HostBinding('class') get classes() {
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

  // This event is fired when the visibility of the application menu is changed,
  // is it also called when the item is changed programmatically.
  @Output() visibility = new EventEmitter<boolean>();

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
  public isOpen() {
    this.applicationmenu.hasClass('is-open');
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
    let $applicationMenu = jQuery(applicationMenu.elementRef.nativeElement).data('applicationmenu');
    let $accordion = $applicationMenu.accordion;
    let accordion = $accordion.data('accordion');

    accordion.headers = $accordion.find('.accordion-header');

    setTimeout(() => {
      let header = jQuery(target).closest('.accordion-header');
      accordion.toggle(header);
    }, 1);
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    let options: SohoApplicationMenuOptions = {
      breakpoint: this.breakpoint,
      openOnLarge: this.openOnLarge,
      triggers: this._triggers
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
      .on('collapse', () => this.visibility.next(false));
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
