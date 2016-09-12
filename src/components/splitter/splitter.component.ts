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
 * Angular Wrapper for the Soho  Splitter Control.
 *
 * This component searches for an element with the attribute
 * 'soho-splitter' in the parent's DOM tree, initialising it with
 * the Soho splitter control.
 */
@Component({
  selector: '[soho-splitter]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSplitterComponent implements AfterViewInit, OnDestroy {

 // -------------------------------------------
 // Options Block
 // -------------------------------------------

 private options: SohoSplitterOptions = {
      axis: 'x',
      resize: 'immediate',
      containment: null
    };

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // The orientation of the splitter, either x (for vertical) or y (for horizontal)
  @Input() set axis(axis: 'x' | 'y') {
    this.options.axis = axis;
    if (this.splitter) {
      this.splitter.settings.axis = axis;
      this.splitter.updated();
    }
  }

  // Controls when the panels are redrawn whilst the splitter is dragged, either
  // continuously (immediate) or when the drag is finished (end).
  @Input() set resize(resize: 'immediate' | 'end') {
    this.options.resize = resize;
    if (this.splitter) {
      this.splitter.settings.resize = resize;
      this.splitter.updated();
    }
  }

  // Constrains the splitter within the bounds of the specified element or region.
  @Input() set containment(containment: any) {
    this.options.containment = containment;
    if (this.splitter) {
      this.splitter.settings.containment = containment;
      this.splitter.updated();
    }
  }

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

     // Initialise the SohoXi Control
    this.jQueryElement.splitter(this.options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case it is 'splitter'.
    this.splitter = this.jQueryElement.data('data');

    // Initialise any event handlers.
    this.jQueryElement
      // Propogate the split event via the event emitter.  The data passed
      // is a reference to the jQuery control.
      .on('split', (...args: any[]) => this.split.next(args));
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    if (this.splitter) {
      this.splitter.destroy();
      this.splitter = null;
    }
  }
}
