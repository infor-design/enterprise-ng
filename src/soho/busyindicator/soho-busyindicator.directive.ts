import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Busy Indicator control.
 *
 * This component searches for an element, annotated with the soho-busyindicator attribute,
 * and then matches this component to it.
 * <br>
 * The characteristics of the component can be controlled using the set of inputs.
 * <br>
 * When activated, this control will display the busy indicator over the control appropriately.
 */
@Directive({
  selector: '[soho-busyindicator]'
})
export class SohoBusyIndicatorDirective implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoBusyIndicatorOptions = {
  };

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private busyindicator: SohoBusyIndicatorStatic;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // Fired after the busy indicator is displayed
  @Output() afterstart = new EventEmitter<SohoBusyIndicatorEvent>();

  /** This event is fired 'timeToComplete' milliseconds after the indicator is opened.
   * NOTE: There's no close event on the busyindicator.
  */
  @Output('close') closeEvent = new EventEmitter<SohoBusyIndicatorEvent>(); // tslint:disable-line

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // Makes the element that Busy Indicator is invoked on unusable while it's displayed.
  @Input()
  public set blockUI(blockUI: boolean) {
    this.options.blockUI = blockUI;
    if (this.busyindicator) {
      this.busyindicator.settings.blockUI = blockUI;
      this.busyindicator.updated();
    }
  }

  // Number in milliseconds to pass before the markup is displayed.  If 0, displays immediately
  @Input()
  public set displayDelay(displayDelay: number) {
    this.options.displayDelay = displayDelay;
    if (this.busyindicator) {
      this.busyindicator.settings.displayDelay = displayDelay;
      this.busyindicator.updated();
    }
  }

  // Fires the 'complete' trigger at a certain timing interval.  If 0, goes indefinitely.
  @Input()
  public set timeToComplete(timeToComplete: number) {
    this.options.timeToComplete = timeToComplete;
    if (this.busyindicator) {
      this.busyindicator.settings.timeToComplete = timeToComplete;
      this.busyindicator.updated();
    }
  }

  /** Custom Text To Show or Will Show Localized 'Loading...' */
  @Input()
  public set text(text: string) {
    this.options.text = text;
    if (this.busyindicator) {
      this.busyindicator.settings.text = text;
      this.busyindicator.updated();
    }
  }

  /** Controls the activated state of the busy indicator. */
  @Input()
  public set activated(value: boolean) {
    if (this.busyindicator) {
      if (value) {
        this.busyindicator.activate();
      } else {
        this.busyindicator.close(true);
      }
    }
  }

  /**
   * Display an overlay that prevents interaction,
   * but appears transparent instead of gray.
   */
  @Input()
  public set transparentOverlay(transparentOverlay: boolean) {
    this.options.transparentOverlay = transparentOverlay;
    if (this.busyindicator) {
      this.busyindicator.settings.transparentOverlay = transparentOverlay;
      this.busyindicator.updated();
    }
  }

  /**
   * To display only the overlay w/o the badge and text. Useful to stop input to a component
   * that doesn't already have another mechanism (like a disabled state).
   */
  @Input()
  public set overlayOnly(overlayOnly: boolean) {
    this.options.overlayOnly = overlayOnly;
    if (this.busyindicator) {
      this.busyindicator.settings.overlayOnly = overlayOnly;
      this.busyindicator.updated();
    }
  }

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private elementRef: ElementRef) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Closes the indicator, if open.
   */
  public close(fromEvent: boolean) {
    if (this.busyindicator) {
      this.busyindicator.close(fromEvent);
    }
  }

  /**
   * Displays the busy indicator.
   */
  public open() {
    if (this.busyindicator) {
      this.busyindicator.activate();
    }
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.busyindicator(this.options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case it is 'busyindicator'.
    this.busyindicator = this.jQueryElement.data('busyindicator');

    // Initialise any event handlers.
    this.jQueryElement
      .on('afterstart', (e: JQuery.Event) => this.onAfterStart(e))
      .on('close', (e: JQuery.Event) => this.onClose(e));
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    if (this.busyindicator) {
      this.busyindicator.destroy();
      this.busyindicator = null;
    }
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Publishes the event, after annotating the event.
   */
  private onAfterStart(event: JQuery.Event) {
    this.afterstart.next({ type: 'afterstart', component: this, event: event });
  }

  /**
   * Publishes the vent, after annotating the event.
   */
  private onClose(event: JQuery.Event) {
    this.closeEvent.next({ type: 'close', component: this, event: event });
  }
}

/**
 * Customised event object.
 */
export interface SohoBusyIndicatorEvent {
  /** Event Type. */
  type: 'afterstart' | 'close';

  /** Source Component. */
  component: SohoBusyIndicatorDirective;

  /** Full JQuery Event. */
  event: JQuery.Event;
}
