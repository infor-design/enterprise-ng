import {
  Component,
  HostBinding,
  Output,
  EventEmitter,
  ElementRef,
  Input
} from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * Angular Wrapper for the SoHo Application Menu Component.
 *
 * This component searches for a nav element with the attribute
 * 'soho-applcation-menu' in the parent's DOM tree, initialising those found with
 * the SoHo application menu control.
 */
@Component({
  moduleId: module.id,
  selector: 'nav[soho-application-menu]', // @todo agree correct selector.
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'application-menu.component.html'
})
export class ApplicationMenuComponent {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // Breakpoint
  @Input() breakpoint: 'phablet' | 'tablet' | 'desktop' | 'large';

  // Open on resize?
  @Input() openOnLarge: boolean;

  // A list of jQuery element which trigger he openning and closing of the menu.
  @Input() triggers: any[];

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
  private jQueryElement: any;

  // Reference to the annotated SoHoXi control
  private applicationmenu: any;

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
  closeMenu() {
    this.applicationmenu.closeMenu();
  }

  /** Open the menu. */
  openMenu() {
    this.applicationmenu.openMenu();
  }

  /**
   * Returns true if the menu is open, otherwise false.
   */
  isOpen() {
    this.applicationmenu.hasClass('is-open');
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    let options: SoHoApplicationMenuOptions = {
      breakpoint: this.breakpoint,
      openOnLarge: this.openOnLarge,
      triggers: this.triggers
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
}
