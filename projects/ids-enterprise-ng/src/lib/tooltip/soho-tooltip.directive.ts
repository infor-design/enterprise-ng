import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  OnChanges
} from '@angular/core';

@Directive({
  selector: '[soho-tooltip]' // eslint-disable-line
})
export class SohoTooltipDirective implements AfterViewInit, OnDestroy, OnChanges {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTooltipOptions = {};

  // -------------------------------------------
  // Component Input options
  // -------------------------------------------
  /**
   * @param content the content of the tooltip
   */
  @Input() set content(content: string) {
    this.options.content = content;
    if (this.tooltip) {
      this.tooltip.settings.content = content;
    }
  }

  /**
   * @param offset offset
   */
  @Input() set offset(offset: number) {
    this.options.offset = offset;
  }

  /**
   * @param placement the orientation of the tooltip based on the source component.
   */
  @Input() set placement(placement: SohoTooltipOffset) {
    this.options.placement = placement;
  }

  @Input() set trigger(trigger: string) {
    this.options.trigger = trigger;
  }

  /**
   * @param tooltipTitle the title of the tooltip.
   */
  @Input() set title(title: string) {
    this.options.title = title;
  }

  /**
   * @param beforeShow before show.
   */
  @Input() set beforeShow(beforeShow: any) {
    this.options.beforeShow = beforeShow;
  }

  /**
   * @param popover is this a popover?
   */
  @Input() set popover(popover: boolean) {
    this.options.popover = popover;
  }

  /**
   * @param closebutton display the close button?
   */
  @Input() set closebutton(closebutton: boolean) {
    this.options.closebutton = closebutton;
  }

  /**
   * @param isError is this an error tooltip.
   */
  @Input() set isError(isError: boolean) {
    this.options.isError = isError;
  }

  /**
   * @param isErrorColor use the error color.
   */
  @Input() set isErrorColor(isErrorColor: boolean) {
    this.options.isErrorColor = isErrorColor;
  }

  /**
   * @param tooltipElement tooptip element
   */
  @Input() set tooltipElement(tooltipElement: any) {
    this.options.tooltipElement = tooltipElement;
  }

  /**
   * @param keepOpen keep the tooltip open?
   */
  @Input() set keepOpen(keepOpen: boolean) {
    this.options.keepOpen = keepOpen;
  }

  /**
   * @param extraClass additional classes
   */
  @Input() set extraClass(extraClass: string) {
    this.options.extraClass = extraClass;
  }

  /**
   * @param appendTo additional classes
   */
  @Input() set appendTo(appendTo: string) {
    this.options.appendTo = appendTo;
  }

  /**
   * @param maxWidth the maximum width of the tooltip in pixels.
   */
  @Input() set maxWidth(maxWidth: number) {
    this.options.maxWidth = maxWidth;
  }

  /**
   * If the object with the tooltip is tabbed to, will also show the tooltip.
   */
  @Input() set showOnKeyboardFocus(showOnKeyboardFocus: boolean) {
    this.options.showOnKeyboardFocus = showOnKeyboardFocus;
  }

  /**
   * Call back for hiding.
   */
  @Input() set onHidden(onHidden: Function) {
    this.options.onHidden = onHidden;
  }

  /**
   * Placement options pass through
   */
  @Input() set placementOpt(placementOpt: object) {
    this.options.placementOpt = placementOpt;
  }

  /**
   * Init the content in the tooltip.
   */
  @Input() set initializeContent(initializeContent: boolean) {
    this.options.initializeContent = initializeContent;
  }

  /**
   * If set this color will be used on the header (if a popover).
   */
  @Input() set headerClass(headerClass: string) {
    this.options.headerClass = headerClass;
  }

  /**
   * The delay before showing the tooltip
   */
  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  /**
   * The if true (default) the popup is added to the body.
   */
  @Input() set attachToBody(attachToBody: boolean) {
    this.options.attachToBody = attachToBody;
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the tooltip value changes
   */
  @Output() changeEvent = new EventEmitter<SohoTooltipEvent>();

  /**
   * Called when the tooltip updates in some way
   */
  @Output() updateEvent = new EventEmitter<SohoTooltipEvent>();

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the SoHoXi control api.
  private tooltip?: SohoTooltipStatic | null;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.createControl();
  }

  private createControl() {
    // Initialise the SohoXi Control
    this.jQueryElement?.tooltip(this.options);

    this.tooltip = this.jQueryElement?.data('tooltip');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement?.on('change', (event: SohoTooltipEvent) => this.changeEvent.emit(event));
    this.jQueryElement?.on('updated', (event: SohoTooltipEvent) => this.updateEvent.emit(event));
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Shows the tooltip.
   */
  public show(): void {
    if (this.tooltip) {
      this.tooltip.show();
    }
  }

  /**
   * Hides the tooltip.
   */
  public hide(force?: boolean): void {
    if (this.tooltip) {
      this.tooltip.hide(force);
    }
  }

  ngOnDestroy() {
    if (this.jQueryElement) {
      this.jQueryElement.off();
      this.jQueryElement = undefined;
      this.element.nativeElement = undefined;
    }
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }

  ngOnChanges() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
      this.createControl();
    }
  }
}
