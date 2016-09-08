import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Data Splitter Control.
 *
 * This component searches for an element with the attribute
 * 'soho-splitter' in the parent's DOM tree, initialising it with
 * the Soho splitter control.
 */
@Component({
  selector: '[soho-splitter]',
  templateUrl: 'splitter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSplitterComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // The orientation of the splitter, either x (for vertical) or y (for horizontal)
  @Input() axis: 'x' | 'y' = 'x';

  // When are the panels redrawn after splitter, either
  // continuously (immediate) or when the splitter is
  // released (end).
  @Input() resize: 'immediate' | 'end' = 'immediate';

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() split = new EventEmitter<Object[]>();

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  // Set the splitter class.
  @HostBinding('class.splitter') isSplitter = true;

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: any;

  // Reference to the Soho splitter control api.
  private splitter: any;

  /**
   * Constructor.
   *
   * @parm element - the element representing the splitter on the page.
   */
  constructor(private element: ElementRef) {
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Splitter Options.
    const options: SohoSplitterOptions = {
      axis: this.axis,
      resize: this.resize,
      containment: null
    };

    this.jQueryElement.splitter(options);

    this.splitter = this.jQueryElement.data('data');

    // Propogate the split event via the event emitter.  The data passed
    // is a reference to the jQuery control.
    this.jQueryElement.on('split', (...args) => this.split.next(args));
  }

  ngOnDestroy() {
    if (this.splitter) {
      this.splitter.destroy();
      this.splitter = null;
    }
  }
}

