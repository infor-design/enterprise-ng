import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  OnDestroy,
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
export class SohoBusyIndicatorDirective implements AfterViewInit, AfterViewChecked, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoBusyIndicatorOptions = {
  };

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  private initiallyActive?: boolean;

  // Reference to the SoHoXi control api.
  private busyindicator?: SohoBusyIndicatorStatic | null;

  private updateBusyIndicator = false;
  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // Fired after the busy indicator is displayed
  @Output() afterstart = new EventEmitter<SohoBusyIndicatorEvent>();

  /**
   * This event is fired when 'timeToComplete' milliseconds is reached
   * after the indicator is opened.
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() complete = new EventEmitter<SohoBusyIndicatorEvent>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // Makes the element that Busy Indicator is invoked on unusable while it's displayed.
  @Input()
  public set blockUI(blockUI: boolean) {
    this.options.blockUI = blockUI;
    if (this.busyindicator) {
      (this.busyindicator.settings as any).blockUI = blockUI;
      this.updateBusyIndicator = true;
    }
  }

  // Number in milliseconds to pass before the markup is displayed.  If 0, displays immediately
  @Input()
  public set displayDelay(displayDelay: number) {
    this.options.displayDelay = displayDelay;
    if (this.busyindicator) {
      (this.busyindicator.settings as any).displayDelay = displayDelay;
      this.updateBusyIndicator = true;
    }
  }

  // Fires the 'complete' trigger at a certain timing interval.  If 0, goes indefinitely.
  @Input()
  public set timeToComplete(timeToComplete: number) {
    this.options.timeToComplete = timeToComplete;
    if (this.busyindicator) {
      (this.busyindicator.settings as any).timeToComplete = timeToComplete;
      this.updateBusyIndicator = true;
    }
  }

  /** Custom Text To Show or Will Show Localized 'Loading...' */
  @Input()
  public set text(text: string) {
    this.options.text = text;
    if (this.busyindicator) {
      (this.busyindicator.settings as any).text = text;
      this.updateBusyIndicator = true;
    }
  }

  /** Controls the activated state of the busy indicator. */
  @Input()
  public set activated(value: boolean | undefined) {
    this.initiallyActive = value;
    if (value) {
      this.open();
    } else {
      this.close(true);
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
      (this.busyindicator.settings as any).transparentOverlay = transparentOverlay;
      this.updateBusyIndicator = true;
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
      (this.busyindicator.settings as any).overlayOnly = overlayOnly;
      this.updateBusyIndicator = true;
    }
  }

  /**
   * To display only the overlay w/o the badge and text. Useful to stop input to a component
   * that doesn't already have another mechanism (like a disabled state).
   */
  @Input()
  public set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;
    if (this.busyindicator) {
      (this.busyindicator.settings as any).attributes = attributes;
      this.updateBusyIndicator = true;
    }
  }

  /**
   * To get the attributes of the busy indicator. Useful for things like getting an indicator based on an Id.
   */
  public get attributes(): Object | Array<Object> {
    if (this.busyindicator) {
      return this.options.attributes ? this.options.attributes : [];
    }
    return [];
  }

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Closes the indicator, if open.
   */
  public close(fromEvent: boolean) {
    if (this.busyindicator) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.ngZone.runOutsideAngular(() => this.busyindicator?.close(fromEvent));
    }
  }

  /**
   * Displays the busy indicator.
   */
  public open() {
    if (this.busyindicator) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.ngZone.runOutsideAngular(() => this.busyindicator?.activate());
    }
  }

  public isActive(): boolean | undefined {
    if (this.busyindicator) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      return this.ngZone.runOutsideAngular(() => this.busyindicator?.isActive());
    }
    return false;
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Initialise the SohoXi Control
      this.jQueryElement.busyindicator(this.options);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case it is 'busyindicator'.
      this.busyindicator = this.jQueryElement.data('busyindicator');

      // Initialise any event handlers.
      this.jQueryElement.on('afterstart', (e: JQuery.TriggeredEvent) => this.onAfterStart(e));
      this.jQueryElement.on('complete', (e: JQuery.TriggeredEvent) => this.onComplete(e));

      // Set initial state
      this.ngZone.run(() => this.activated = this.initiallyActive);
    });
  }

  ngAfterViewChecked() {
    if (this.busyindicator && this.updateBusyIndicator) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.ngZone.runOutsideAngular(() => {
        this.updateBusyIndicator = false;
        this.busyindicator?.updated();
      });
    }
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.busyindicator) {
        // call outside the angular zone so change detection isn't triggered by the soho component.
        this.busyindicator?.destroy();
        this.busyindicator = null;
      }
    });
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Publishes the event, after annotating the event.
   */
  private onAfterStart(event: JQuery.TriggeredEvent) {
    this.ngZone.run(() =>
      this.afterstart.next({
        type: 'afterstart',
        component: this,
        event
      }));
  }

  /**
   * Publishes the event, after annotating the event.
   */
  private onComplete(event: JQuery.TriggeredEvent) {
    this.ngZone.run(() =>
      this.complete.next({
        type: 'complete',
        component: this,
        event
      }));
  }
}

/**
 * Customised event object.
 */
export interface SohoBusyIndicatorEvent {
  /** Event Type. */
  type: 'afterstart' | 'complete';

  /** Source Component. */
  component: SohoBusyIndicatorDirective;

  /** Full JQuery Event. */
  event: JQuery.TriggeredEvent;
}
