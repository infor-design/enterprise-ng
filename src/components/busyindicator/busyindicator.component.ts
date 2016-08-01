
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ChangeDetectionStrategy
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
@Component({
  moduleId: module.id,
  selector: '[soho-busyindicator]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoBusyIndicatorComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoBusyIndicatorOptions = {
    blockUI: false,
    text: 'Loading...', // I18N
    delay: 0,
    timeToComplete: 0,
    timeToClose: 0
  };

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private busyindicator: any;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // Fired after the busy indicator is displayed
  @Output() onAfterStart = new EventEmitter<BusyIndicatorEvent>();

  // Fired after the busy indicator is closed.
  @Output() onComplete = new EventEmitter<BusyIndicatorEvent>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // Makes the element that Busy Indicator is invoked on unusable while it's displayed.
  @Input() set blockUI(blockUI: boolean) {
    this.options.blockUI = blockUI;
    if (this.busyindicator) {
      this.busyindicator.settings.blockUI = blockUI;
      this.busyindicator.updated();
    }
  }

  // Number in milliseconds to pass before the markup is displayed.  If 0, displays immediately
  @Input() set delay(delay: number) {
    this.options.delay = delay;
    if (this.busyindicator) {
      this.busyindicator.settings.delay = delay;
      this.busyindicator.updated();
    }
  }

  // fires the 'complete' trigger at a certain timing interval.  If 0, goes indefinitely.
  @Input() set timeToComplete(timeToComplete: number) {
    this.options.timeToClose = timeToComplete;
    if (this.busyindicator) {
      this.busyindicator.settings.timeToClose = timeToComplete;
      this.busyindicator.updated();
    }
  }

  // fires the 'close' trigger at a certain timing interval.  If 0, goes indefinitely.
  @Input() set timeToClose(timeToClose: number) {
    this.options.timeToClose = timeToClose;
    if (this.busyindicator) {
      this.busyindicator.settings.timeToClose = timeToClose;
      this.busyindicator.updated();
    }
  }

  // Custom Text To Show or Will Show Localized Loading....
  @Input() set text(text: string) {
    this.options.text = text;
    if (this.busyindicator) {
      this.busyindicator.settings.text = text;
      this.busyindicator.updated();
    }
  }

  // Controls the activated state of the busy indicator.
  @Input() set activated(value: boolean) {
    if (this.busyindicator) {
      if (value === true) {
        this.busyindicator.activate();
      } else {
        this.busyindicator.close();
      }
    }
  }

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private elementRef: ElementRef) {
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
      .on('afterstart', (e: any, args: BusyIndicatorEvent) => this.onAfterStart.next(args))
      .on('complete', (e: any, args: BusyIndicatorEvent) => this.onComplete.next(args));
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
}

/**
 * Soho Busy Indicator Event
 */
export interface BusyIndicatorEvent {
}
