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
export class SohoTooltipComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoTooltipOptions = {
    content: undefined, //Takes title attribute or feed content. Can be a function or jQuery markup
    offset: undefined, //how much room to leave
    placement: undefined,  //can be top/left/bottom/right/offset
    trigger: undefined, //supports click and immediate and hover (and maybe in future focus)
    title: undefined, //Title for Infor Tips
    beforeShow: undefined, //Call back for ajax tooltip
    popover: undefined , //force it to be a popover (no content)
    closebutton: undefined, //Show X close button next to title in popover
    isError: undefined, //Add error classes
    isErrorColor: undefined, //Add error color only not description
    tooltipElement: undefined, // ID selector for an alternate element to use to contain the tooltip classes
    keepOpen: undefined, // Forces the tooltip to stay open in situations where it would normally close.
    extraClass: undefined, // Extra css class
    maxWidth: undefined // Toolip max width
  };

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
  @Input() set placement(placement: string) {
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
    this.jQueryElement.on('change', (e: any, args: SohoTooltipEvent) => this.changeEvent.next(args));
    this.jQueryElement.on('updated', (e: any, args: SohoTooltipEvent) => this.updateEvent.next(args));

    this.tooltip = this.jQueryElement.data('tooltip');
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------
  show(): void {
    this.tooltip.show();
  }

  hide(): void {
    this.tooltip.hide();
  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }
}
