import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[soho-tooltip]' // tslint:disable-line
})
export class SohoTooltipDirective implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTooltipOptions = {};

  // -------------------------------------------
  // Component Input options
  // -------------------------------------------
  /**
 * @param content
 */
  @Input() set content(content: string) {
    this.options.content = content;
  }
  /**
   * @param offset
   */
  @Input() set offset(offset: number) {
    this.options.offset = offset;
  }
  /**
   * @param placement
   */
  @Input() set placement(placement: SohoTooltipOffset) {
    this.options.placement = placement;
  }
  /**
   * @param trigger
   */
  @Input() set trigger(trigger: string) {
    this.options.trigger = trigger;
  }
  /**
   * @param tooltipTitle
   */
  @Input() set tooltipTitle(tooltipTitle: string) {
    this.options.title = tooltipTitle;
  }
  /**
   * @param beforeShow
   */
  @Input() set beforeShow(beforeShow: any) {
    this.options.beforeShow = beforeShow;
  }
  /**
   * @param popover
   */
  @Input() set popover(popover: boolean) {
    this.options.popover = popover;
  }
  /**
   * @param closebutton
   */
  @Input() set closebutton(closebutton: boolean) {
    this.options.closebutton = closebutton;
  }
  /**
   * @param isError
   */
  @Input() set isError(isError: boolean) {
    this.options.isError = isError;
  }
  /**
   * @param isErrorColor
   */
  @Input() set isErrorColor(isErrorColor: boolean) {
    this.options.isErrorColor = isErrorColor;
  }
  /**
   * @param tooltipElement
   */
  @Input() set tooltipElement(tooltipElement: any) {
    this.options.tooltipElement = tooltipElement;
  }
  /**
   * @param keepOpen
   */
  @Input() set keepOpen(keepOpen: boolean) {
    this.options.keepOpen = keepOpen;
  }
  /**
   * @param extraClass
   */
  @Input() set extraClass(extraClass: string) {
    this.options.extraClass = extraClass;
  }
  /**
   * @param maxWidth
   */
  @Input() set maxWidth(maxWidth: number) {
    this.options.maxWidth = maxWidth;
  }

  /**
   * Local variables
   */

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
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private tooltip: any;

  constructor(private element: ElementRef) {

  }

  ngAfterViewInit() {
    // Wrap the element in a jQuery selector.
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialise the SohoXi Control
    this.jQueryElement.tooltip(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoTooltipEvent) => this.changeEvent.emit(event));
    this.jQueryElement.on('updated', (event: SohoTooltipEvent) => this.updateEvent.emit(event));

    this.tooltip = this.jQueryElement.data('tooltip');
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
  public hide(): void {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }
}
