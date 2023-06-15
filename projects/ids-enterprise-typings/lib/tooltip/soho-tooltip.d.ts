interface SohoTooltipOptions {
  content?: string; // Feed in popover content. Can be a string or jQuery selector
  offset?: number; // how much room to leave
  placement?: SohoTooltipOffset;  // can be top/left/bottom/right/offset
  trigger?: string; // supports click and immediate and hover (and maybe in future focus)
  title?: string; // Title for Infor Tips
  beforeShow?: any; // Call back for ajax tooltip
  popover?: boolean; // force it to be a popover (no content)
  closebutton?: boolean; // Show X close button next to title in popover
  isError?: boolean; // Add error classes
  isErrorColor?: boolean; // Add error color only not description
  tooltipElement?: any; // ID selector for an alternate element to use to contain the tooltip classes

  /**
   * jQuery-wrapped element that gets passed to the 'place' behavior as the element to place
   * the tooltip against.  Defaults to "this.element" in tooltip, if not set.
   */
  parentElement?: JQuery;
  keepOpen?: boolean; // Forces the tooltip to stay open in situations where it would normally close.
  extraClass?: string; // Extra css class
  maxWidth?: number; // Tooltip max width
  appendTo?: string; // Settings to where should tooltip be appended

  /** If the object with the tooltip is tabbed to, will also show the tooltip. **/
  showOnKeyboardFocus?: boolean;
  /** Call back for hiding. **/
  onHidden?: Function;
  /** Placement options pass through **/
  placementOpt?: object;
  /** Init the content in the tooltip. **/
  initializeContent?: boolean;
  /** If set this color will be used on the header (if a popover). **/
  headerClass?: string;
  /** The delay before showing the tooltip **/
  delay?: number;
  /** The if true (default) the popup is added to the body. **/
  attachToBody?: boolean;
  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * Customised event object.
 */
interface SohoTooltipEvent extends JQuery.TriggeredEvent {

}

/**
 * This interface represents the api exposed by the
 * Soho control.
 */
interface SohoTooltipStatic {
  settings: SohoTooltipOptions;
  destroy(): void;
  hide(force?: boolean): void;
  show(): void;
  updated(): void;
}

/**
 * JQuery Integration
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  tooltip(options?: SohoTooltipOptions): JQuery;
}

type SohoTooltipOffset = 'top' | 'left' | 'bottom' | 'right' | 'offset';
