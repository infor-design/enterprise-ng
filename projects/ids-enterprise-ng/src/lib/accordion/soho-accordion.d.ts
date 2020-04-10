/**
 * Soho Accordion Typings.
 *
 * The Accordion is a grouped set of collapsible panels used to navigate sections of
 * related content. Each panel consists of two levels: the top level identifies the
 * category or section header, and the second level provides the associated options.
 */

type SohoAccordionExpanderType = 'classic' | 'plus-minus' | 'chevron';

 /**
 * Soho Accordion Control Options
 */
 interface SohoAccordionOptions {
  /**
   * If set to true, allows only one pane of the Accordion to be open at a time.
   * If an Accordion pane is open, and that pane contains sub-headers,
   * only one of the pane's sub-headers can be open at a time. (default true)
   */
  allowOnePane?: boolean;

  /**
   * Displays a "Chevron" icon that sits off to the right-most side of a top-level
   * accordion header.  Used in place of an Expander (+/-) if enabled.
   */
  displayChevron?: boolean;

  /**
   * Changes the iconography used in accordion header expander buttons.
   */
  expanderDisplay?: SohoAccordionExpanderType;

  /**
   * Set to false if routing is handled externally.
   */
  rerouteOnLinkClick?: boolean;

  /**
   * A callback function that when implemented provided a call back for "ajax loading"
   * of tab contents on open.
   */
  source?: Function;

   /**
    *  Set true to use panels with header selection
    */
   hasPanels?: boolean;

   /**
    * Sets the color scheme to inverse
    */
   inverse?: boolean;

   /**
    * Sets the color scheme to alternate
    */
   alternate?: boolean;

   /**
    * Enables tooltips for longer text that is handled with ellipsis
    */
   enableTooltips?: boolean;
 }

/**
 * This interface represents the public API exposed by the
 * busy indicator.
 */
interface SohoAccordionStatic {
  /** Access to the control's options block. */
  settings: SohoAccordionOptions;

  /** Collapses all panels. */
  collapseAll(): void;

  /** Expands all panels. */
  expandAll(): void;

  expand(jQuery): void;

  collapse(jQuery): void;

  /** Disables the accordion from reacting to events. */
  disable(): void;

  /** Enables the accordion. */
  enable(): void;

  /** Checks if a particular header is disabled, or if the entire accordion is disabled. */
  isDisabled(jQuery): boolean;

  /** Checks if an Accordion Section is currently expanded. */
  isExpanded(jQuery): boolean;

  /** Toggles the exanded state of the selected header. */
  toggle(jQuery): void;

  /** Updates the accordion with any new settings. */
  updated(headers?: JQuery[], settings?: SohoAccordionOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  accordion: any;
}

/**
 * jQuery integration.
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  accordion(options?: SohoAccordionOptions): SohoAccordionStatic;
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoAccordionEvent>): this;
}

interface SohoAccordionEvent extends JQuery.TriggeredEvent {
  anchor: HTMLAnchorElement;
}
