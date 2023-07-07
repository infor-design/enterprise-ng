// tslint:disable-next-line:no-unused-variable
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, NgZone,
  OnDestroy,
  Output,
  QueryList,
  forwardRef,
} from '@angular/core';

import { SohoAccordionHeaderComponent } from './soho-accordion-header.component';
import { SohoAccordionPaneComponent } from './soho-accordion-pane.component';

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
 */
@Component({
  selector: 'soho-accordion, [soho-accordion]',
  styleUrls: ['./soho-accordion.component.css'],
  templateUrl: 'soho-accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoAccordionComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  // All headers.
  // eslint-disable-next-line @angular-eslint/no-forward-ref
  @ContentChildren(forwardRef(() => SohoAccordionHeaderComponent))
  headers!: QueryList<SohoAccordionHeaderComponent>;

  // All panes.
  // eslint-disable-next-line @angular-eslint/no-forward-ref
  @ContentChildren(forwardRef(() => SohoAccordionPaneComponent))
  panes!: QueryList<SohoAccordionPaneComponent>;

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  public options: SohoAccordionOptions = {};

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery selector. */
  private jQueryElement!: JQuery | undefined;

  /**
   * References to the Soho control api.
   */
  private accordion!: SohoAccordionStatic;

  /**
   * Used to call updated from the afterViewChecked lifecycle event.
   */
  private updateRequired?: boolean;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /* eslint-disable @angular-eslint/no-output-rename */
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
   * If set to true, allows only one pane of the accordion to be open at a time.
   */
  @Input() public set allowOnePane(allowOnePane: boolean | undefined) {
    this.options.allowOnePane = typeof (allowOnePane) === 'boolean' && allowOnePane;
    if (this.accordion) {
      (this.accordion.settings as any).allowOnePane = this.options.allowOnePane;
      this.markForUpdate();
    }
  }
  public get allowOnePane() {
    return this.options.allowOnePane;
  }

  /**
   * Displays a "Chevron" icon that sits off to the right-most side of a top-level accordion header.
   * Used in place of an Expander (+/-) if enabled.
   *
   *
   */
  @Input() public set displayChevron(displayChevron: boolean | undefined) {
    this.options.displayChevron = typeof (displayChevron) === 'boolean' && displayChevron;
    if (this.accordion) {
      (this.accordion.settings as any).displayChevron = this.options.displayChevron;
      this.markForUpdate();
    }
  }
  public get displayChevron() {
    return this.options.displayChevron;
  }

  /**
   * Changes the iconography used in accordion header expander buttons.
   */
  @Input() public set expanderDisplay(expanderDisplay: SohoAccordionExpanderType | undefined) {
    this.options.expanderDisplay = expanderDisplay;
    if (this.accordion) {
      (this.accordion.settings as any).expanderDisplay = this.options.expanderDisplay;
      this.markForUpdate();
    }
  }
  public get expanderDisplay() {
    return this.options.expanderDisplay;
  }

  /**
   * Can be set to false if routing is externally handled, otherwise
   * links are handled normally.
   */
  @Input() public set rerouteOnLinkClick(rerouteOnLinkClick: boolean | undefined) {
    this.options.rerouteOnLinkClick = typeof (rerouteOnLinkClick) === 'boolean' && rerouteOnLinkClick;
    if (this.accordion) {
      (this.accordion.settings as any).rerouteOnLinkClick = this.options.rerouteOnLinkClick;
      this.markForUpdate();
    }
  }
  public get rerouteOnLinkClick() {
    return this.options.rerouteOnLinkClick;
  }

  /**
   * Add a alert badge to the accordion header (used for App menu)
   */
  @Input() public set notificationBadge(notificationBadge: boolean | undefined) {
    this.options.notificationBadge = typeof (notificationBadge) === 'boolean' && notificationBadge;
    if (this.accordion) {
      (this.accordion.settings as any).notificationBadge = this.options.notificationBadge;
      this.markForUpdate();
    }
  }
  public get notificationBadge() {
    return this.options.notificationBadge;
  }


  /**
   * A callback function that when implemented provided a call back for "ajax loading" of tab contents on open.
   */
  @Input() public set source(source: Function | undefined) {
    this.options.source = source;
    if (this.accordion) {
      (this.accordion.settings as any).source = this.options.source;
      this.markForUpdate();
    }
  }
  public get source(): Function | undefined {
    return this.options.source;
  }

  /**
   * Display accordion with panels
   */
  @Input() public set hasPanels(hasPanels: boolean | undefined) {
    this.options.hasPanels = hasPanels;
    if (this.accordion) {
      (this.accordion.settings as any).hasPanels = this.options.hasPanels;
      this.markForUpdate();
    }
  }

  public get hasPanels(): boolean | undefined {
    return this.options.hasPanels;
  }

  /**
   * Set the color scheme to inverse
   */
  @Input() public set inverse(inverse: boolean | undefined) {
    this.options.inverse = inverse;
    if (this.accordion) {
      (this.accordion.settings as any).inverse = this.options.inverse;
      this.markForUpdate();
    }
  }
  public get inverse(): boolean | undefined {
    return this.options.inverse;
  }

  /**
   * Set the color scheme to alternate
   */
  @Input() public set alternate(bool: boolean | undefined) {
    this.options.alternate = bool;
    if (this.accordion) {
      (this.accordion.settings as any).alternate = this.options.alternate;
      this.markForUpdate();
    }
  }

  public get alternate(): boolean | undefined {
    return this.options.alternate;
  }

  /**
   * Enables tooltips for longer text that is handled with ellipsis
   */
  @Input() public set enableTooltips(enableTooltips: boolean | undefined) {
    this.options.enableTooltips = enableTooltips;
    if (this.accordion) {
      (this.accordion.settings as any).enableTooltips = this.options.enableTooltips;
      this.markForUpdate();
    }
  }
  public get enableTooltips(): boolean | undefined {
    return this.options.enableTooltips;
  }

  @Input() public hasSubheaderSeparators?: boolean;

  /** Enables Module Nav variant */
  @Input() public moduleNav?: boolean;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   * @param ngZone - zone access.
   */
  constructor(private element: ElementRef, private ngZone: NgZone) { }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Makes provided accordion headers appear "selected"
   */
  public select(header: SohoAccordionHeaderComponent | string): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => {
        return this.accordion.select(typeof header === 'string' ? header : header['jQueryElement']);
      });
    }
  }

  /**
   * Makes provided accordion headers appear "deselected"
   */
  public deselect(header: SohoAccordionHeaderComponent | string): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => {
        return this.accordion.deselect(typeof header === 'string' ? header : header['jQueryElement']);
      });
    }
  }

  /**
   * Makes all accordion headers appear "deselected"
   */
  public deselectAll(): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => {
        return this.accordion.deselectAll();
      });
    }
  }

  /**
   * Get's the nth header from the accordion.
   *
   * @todo - how best to access the headers?
   *
   * @param index - the index of the accordion header.
   * @return the header at the given index.
   */
  public getHeader(index: number): SohoAccordionHeaderComponent | undefined {
    if (!this.headers) {
      return undefined;
    }
    return this.headers.toArray()[index];
  }

  /**
   * Expand the given Panel on the Accordion.
   *
   * @param header &nbsp;-&nbsp; the header component
   */
  public expand(header: SohoAccordionHeaderComponent | string): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => {
        return this.accordion.expand(typeof header === 'string' ? header : header['jQueryElement']);
      });
    }
  }

  /**
   * Collapse the given Panel on the Accordion.
   *
   * @param header &nbsp;-&nbsp; the jquery header element
   */
  public collapse(header: SohoAccordionHeaderComponent | string): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => {
        return this.accordion.collapse(typeof header === 'string' ? header : header['jQueryElement']);
      });
    }
  }

  /**
   * Expands all accordion headers, if possible.
   */
  public expandAll(): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.expandAll());
    }
  }

  /**
   * Collapses all the expanded panels.
   *
   *
   */
  public collapseAll(): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.collapseAll());
    }
  }

  /**
   * Disables the control.
   */
  public disable() {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.disable());
    }
  }
  /**
   * Enables the control.
   */
  public enable() {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.enable());
    }
  }

  /**
   * Returns true if the given header is currently disabled or the whole accordion
   * is disabled; otherwise false.
   *
   * @param header the accordion header panel to check.
   */
  public isDisabled(header: SohoAccordionHeaderComponent): boolean {
    if (this.accordion) {
      return this.ngZone.runOutsideAngular(() => this.accordion.isDisabled(header.jQueryElement));
    }
    return false;
  }

  /**
   * Returns true if the given header is currently expanded; otherwise
   * false.
   *
   * @param header the accordion header panel to check.
   */
  public isExpanded(header: SohoAccordionHeaderComponent): boolean {
    if (this.accordion) {
      return this.ngZone.runOutsideAngular(() => this.accordion.isExpanded(header.jQueryElement));
    }
    return false;
  }

  /**
   * Toggle the given Panel on the Accordion between expanded and collapsed
   *
   * @param header &nbsp;-&nbsp; the jquery header element
   */
  public toggle(header: SohoAccordionHeaderComponent): void {
    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.toggle(header.jQueryElement));
    }
  }

  /**
   * Call to notify the accordion about any dom changes
   */
  public updated(headers?: JQuery[], settings?: SohoAccordionOptions): void {
    if (settings) {
      this.options = Soho.utils.mergeSettings((this.element as any)[0], settings, this.options);
    }

    if (this.accordion) {
      this.ngZone.runOutsideAngular(() => this.accordion.updated(headers, this.options));
    }
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement.childNodes[0]);

      // Initialise the event handlers.
      this.jQueryElement
        .on('beforeexpand', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.beforeexpandEvent.emit(event);
          }))
        .on('beforecollapse', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.beforecollapseEvent.emit(event);
          }))
        .on('beforeselect', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.beforeselectEvent.emit(event);
          }))
        .on('selected', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.selectedEvent.emit(event);
          }))
        .on('followlink', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.followlinkEvent.emit(event);
          }))
        .on('expand', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.expandEvent.emit(event);
          }))
        .on('afterexpand', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.afterexpandEvent.emit(event);
          }))
        .on('collapse', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.collapseEvent.emit(event);
          }))
        .on('aftercollapse', (event: SohoAccordionEvent, anchor) =>
          this.ngZone.run(() => {
            event.anchor = anchor; this.aftercollapseEvent.emit(event);
          }));

      // Initialise the SohoXi Control
      this.jQueryElement.accordion(this.options);

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is
      // defined by the plug-in, but in this case it is 'accordion'.
      this.accordion = this.jQueryElement.data('accordion');
    });
  }
  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.updated();
      this.updateRequired = false;
    }
  }

  /**
   * Destructor.
   */
  ngOnDestroy(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.accordion) {
        this.accordion?.destroy();
      }
    });
  }

  private markForUpdate(): void {
    this.updateRequired = true;
  }
}
