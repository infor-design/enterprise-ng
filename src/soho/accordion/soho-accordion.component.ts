import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';

import { SohoAccordionHeaderComponent } from './soho-accordion-header.component';

/**
 * Angular Wrapper for the Soho Accordion control.
 *
 * This component searches for an element, annotated with the `soho-accordion` attribute,
 * and then matches this component to it.
 * <br>
 * The characteristics of the component can be controlled using the set of inputs.
 *
 * The Accordion is a grouped set of collapsible panels used to navigate sections of
 * related content. Each panel consists of two levels: the top level identifies the
 * category or section header, and the second level provides the associated options.
 *
 * @class SohoAccordionComponent
 */
@Component({
  selector: 'soho-accordion',
  templateUrl: './soho-accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoAccordionComponent implements AfterViewInit, OnDestroy {

  // All header panels.
  @ContentChildren(SohoAccordionHeaderComponent) headers: QueryList<SohoAccordionHeaderComponent>;

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoAccordionOptions = {};

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery selector. */
  private jQueryElement: JQuery;

  /**
   * References to theSoho contgrol api.
   *
   * @private
   * @type {SohoAccordionStatic}
   * @memberof SohoAccordionComponent
   */
  private accordion: SohoAccordionStatic;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  // tslint:disable:no-output-rename
  @Output('beforeexpand') beforeexpandEvent = new EventEmitter<any>();
  @Output('beforecollapse') beforecollapseEvent = new EventEmitter<any>();
  @Output('beforeselect') beforeselectEvent = new EventEmitter<any>();
  @Output('selected') selectedEvent = new EventEmitter<any>();
  @Output('followlink') followlinkEvent = new EventEmitter<any>();
  @Output('expand') expandEvent = new EventEmitter<any>();
  @Output('afterexpand') afterexpandEvent = new EventEmitter<any>();
  @Output('collapse') collapseEvent = new EventEmitter<any>();
  @Output('aftercollapse') aftercollapseEvent = new EventEmitter<any>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /**
   * If an Accordion pane is open, and that pane contains sub-headers, only one
   * of the pane's sub-headers can be open at a time.
   *
   * Defaults to true.
   *
   * If set to true, allows only one pane of the Accordion to be open at a time.
   *
   * @memberof SohoAccordionComponent
   */
  @Input() public set allowOnePane(allowOnePane: boolean) {
    this.options.allowOnePane = typeof (allowOnePane) === 'boolean' && allowOnePane;
    if (this.accordion) {
      this.accordion.settings.allowOnePane = this.options.allowOnePane;
      this.accordion.updated();
    }
  }
  public get allowOnePane() {
    return this.options.allowOnePane;
  }

  /**
   * Displays a "Chevron" icon that sits off to the right-most side of a top-level accordion header.
   * Used in place of an Expander (+/-) if enabled.
   *
   * @memberof SohoAccordionComponent
   */
  @Input() public set displayChevron(displayChevron: boolean) {
    this.options.displayChevron = typeof (displayChevron) === 'boolean' && displayChevron;
    if (this.accordion) {
      this.accordion.settings.displayChevron = this.options.displayChevron;
      this.accordion.updated();
    }
  }
  public get displayChevron() {
    return this.options.displayChevron;
  }

  /**
   * Can be set to false if routing is externally handled, otherwise
   * links are handled normally.
   *
   * @memberof SohoAccordionComponent
   */
  @Input() public set rerouteOnLinkClick(rerouteOnLinkClick: boolean) {
    this.options.rerouteOnLinkClick = typeof (rerouteOnLinkClick) === 'boolean' && rerouteOnLinkClick;
    if (this.accordion) {
      this.accordion.settings.rerouteOnLinkClick = this.options.rerouteOnLinkClick;
      this.accordion.updated();
    }
  }
  public get rerouteOnLinkClick() {
    return this.options.rerouteOnLinkClick;
  }

  /**
   * A callback function that when implemented provided a call back for "ajax loading" of tab contents on open.
   *
   * @memberof SohoAccordionComponent
   */
  @Input() public set source(source: Function) {
    this.options.source = source;
    if (this.accordion) {
      this.accordion.settings.source = this.options.source;
      this.accordion.updated();
    }
  }

  /**
   * Display accordion with panels
   */
  @Input() public set hasPanels(bool: boolean) {
    this.options.hasPanels = bool;
  }

  public get hasPanels(): boolean {
    return this.options.hasPanels;
  }

  /**
   * Set the color scheme to inverse
   */
  @Input() public set inverse(bool: boolean) {
    this.options.inverse = bool;
  }

  public get inverse(): boolean {
    return this.options.inverse;
  }

  /**
   * Set the color scheme to alternate
   */
  @Input() public set alternate(bool: boolean) {
    this.options.alternate = bool;
  }

  public get alternate(): boolean {
    return this.options.alternate;
  }

  @Input() public hasSubheaderSeparators: boolean;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private element: ElementRef) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Get's the nth header from the accordion.
   *
   * @todo - how best to access the headers?
   *
   * @param {number} index
   * @returns {SohoAccordionHeaderComponent}
   * @memberof SohoAccordionComponent
   */
  public getHeader(index: number): SohoAccordionHeaderComponent {
    return this.headers.toArray()[index];
  }

  /**
   * Expand the given Panel on the Accordion.
   * @param {Object} header &nbsp;-&nbsp; the header component
   */
  public expand(header: SohoAccordionHeaderComponent): void {
    if (this.accordion) {
      this.accordion.expand(header.jQueryElement);
    }
  }

  /**
   * Collapse the given Panel on the Accordion.
   * @param {Object} header &nbsp;-&nbsp; the jquery header element
   */
  public collapse(header: SohoAccordionHeaderComponent): void {
    if (this.accordion) {
      this.accordion.collapse(header.jQueryElement);
    }
  }

  /**
   * Expands all accordion headers, if possible.
   */
  public expandAll(): void {
    if (this.accordion) {
      this.accordion.expandAll();
    }
  }

  /**
   * Collapses all the expanded panels.
   *
   * @memberof SohoAccordionComponent
   */
  public collapseAll(): void {
    if (this.accordion) {
      this.accordion.collapseAll();
    }
  }

  /**
   * Disables the control.
   */
  public disable() {
    if (this.accordion) {
      this.accordion.disable();
    }
  }
  /**
   * Enables the control.
   */
  public enable() {
    if (this.accordion) {
      this.accordion.enable();
    }
  }

  /**
   * Returns true if the given header is currently disabled or the whole accordion
   * is disabled; otherwise false.
   *
   * @param header the accordion header panel to check.
   */
  public isDisabled(header: SohoAccordionHeaderComponent) {
    if (this.accordion) {
      this.accordion.isDisabled(header.jQueryElement);
    }
  }

  /**
   * Returns true if the given header is currently expanded; otherwise
   * false.
   *
   * @param header the accordion header panel to check.
   */
  public isExpanded(header: SohoAccordionHeaderComponent) {
    if (this.accordion) {
      this.accordion.isExpanded(header.jQueryElement);
    }
  }

  /**
   * Toggle the given Panel on the Accordion between expanded and collapsed
   *
   * @param {Object} header &nbsp;-&nbsp; the jquery header element
   */
  public toggle(header: SohoAccordionHeaderComponent): void {
    if (this.accordion) {
      this.accordion.toggle(header.jQueryElement);
    }
  }

  /**
   * Call to notify the accordion about any dom changes
   */
  public updated(): void {
    if (this.accordion) {
      this.accordion.updated();
    }
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------
  ngAfterViewInit() {

    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement.childNodes[0]);

    // Initialise the event handlers.
    this.jQueryElement
      .on('beforeexpand', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforeexpandEvent.emit(event); })
      .on('beforecollapse', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforecollapseEvent.emit(event); })
      .on('beforeselect', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforeselectEvent.emit(event); })
      .on('selected', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.selectedEvent.emit(event); })
      .on('followlink', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.followlinkEvent.emit(event); })
      .on('expand', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.expandEvent.emit(event); })
      .on('afterexpand', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.afterexpandEvent.emit(event); })
      .on('collapse', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.collapseEvent.emit(event); })
      .on('aftercollapse', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.aftercollapseEvent.emit(event); });

    // Initialise the SohoXi Control
    this.jQueryElement.accordion(this.options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case it is 'accordion'.
    this.accordion = this.jQueryElement.data('accordion');
  }

  /**
   * Destructor.
   *
   * @memberof SohoAccordionComponent
   */
  ngOnDestroy(): void {
    if (this.accordion) {
      this.accordion.destroy();
      this.accordion = null;
    }
  }
}
