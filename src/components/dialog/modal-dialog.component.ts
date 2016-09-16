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

import { SohoModalDialogOptions } from './modal-dialog.model';

/**
 * Angular Wrapper for the SoHo Modal Dialog control.
 *
 * This component searches for an element, named soho-modal,
 * and then matches this component to it.
 * <br>
 * The characteristics of the component can be controlled using the set of inputs.
 * <br>
 * When activated, this control will display the busy indicator over the control appropriately.
 */
@Component({
  selector: 'soho-modal',
  templateUrl: 'dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModalDialogComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: any = {
  };

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private modal: any;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // Fired after the busy indicator is displayed
  @Output() onAfterStart = new EventEmitter<any>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // Makes the element that Busy Indicator is invoked on unusable while it's displayed.
  // @Input() set blockUI(blockUI: boolean) {
  //   this.options.blockUI = blockUI;
  //   if (this.busyindicator) {
  //     this.busyindicator.settings.blockUI = blockUI;
  //     this.busyindicator.updated();
  //   }
  // }

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
    this.modal = this.jQueryElement.data('model');

    // Initialise any event handlers.
    this.jQueryElement
      .on('afterstart', (e: any, args: any) => this.onAfterStart.next(args));
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    if (this.modal) {
      this.modal.destroy();
      this.modal = null;
    }
  }
}
