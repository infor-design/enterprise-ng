/**
 * Soho Accordion Typings.
 *
 * The Accordion is a grouped set of collapsible panels used to navigate sections of
 * related content. Each panel consists of two levels: the top level identifies the
 * category or section header, and the second level provides the associated options.
 */

type SohoAccordionExpanderType = 'classic' | 'plus-minus' | 'chevron';

type SohoAccordionDefaultFocusBehaviorCallback = () => void;

type SohoAccordionHeaderGroup = any; // JQuery<HTMLElement>

type SohoAccordionHeaderExpanderButtonGroup = any; // JQuery<HTMLElement>

type SohoAccordionHeaderAnchorGroup = any; // JQuery<HTMLElement>

type SohoAccordionHeaderAnyGroup = SohoAccordionHeaderGroup | SohoAccordionHeaderExpanderButtonGroup | SohoAccordionHeaderAnchorGroup;

type SohoAccordionNavDirection = 0 | -1 | 1;

/**
 * Soho Accordion data representation types
 * These can be used to work with the results of `.toData()`
 */

type SohoAccordionData = Array<SohoAccordionSectionData> | Array<SohoAccordionHeaderData>;

type SohoAccordionSectionData = {
  index: string,
  type: 'section',
  children?: Array<SohoAccordionHeaderData | SohoAccordionContentData>,
};

type SohoAccordionContentData = {
  index: string,
  type: 'content',
  content?: string,
  contentText?: string
};

type SohoAccordionHeaderData = {
  index: string,
  type: 'header',
  text?: string,
  icon?: string,
  children?: Array<SohoAccordionHeaderData | SohoAccordionContentData>
};

/**
 * Soho Accordion Control Options
 */
interface SohoAccordionOptions {
  /**
   * Provides a mechanism for controlling the behavior of accordion header focus.
   * By default, the built-in behavior is used (ability to focus headers/expanders independently).
   */
  accordionFocusCallback?: (header: JQuery<HTMLElement>, defaultFocusBehaviorCallback?: SohoAccordionDefaultFocusBehaviorCallback) => void;

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
   * Add a alert badge to the accordion header (used for App menu)
   */
  notificationBadge?: boolean;

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
 * This interface represents the public API exposed by the Soho Accordion
 */
interface SohoAccordionStatic {
  /** Access to the control's options block. */
  settings: SohoAccordionOptions;

  /** Calls the `source` method passed via settings */
  callSource(anchor: SohoAccordionHeaderAnchorGroup, animationCallback: () => void): void;

  /** Collapses all panels. */
  collapseAll(): void;

  /** Expands all panels. */
  expandAll(): void;

  /** Expands one or a group of panels */
  expand(header: SohoAccordionHeaderGroup | string): void;

  /** Collapses one or a group of panels */
  collapse(header: SohoAccordionHeaderGroup | string): void;

  /** Disables the accordion from reacting to events. */
  disable(): void;

  /** Enables the accordion. */
  enable(): void;

  /** Checks if a particular header is disabled, or if the entire accordion is disabled. */
  isDisabled(header: SohoAccordionHeaderGroup): boolean;

  /** Checks if an Accordion Section is currently expanded. */
  isExpanded(header: SohoAccordionHeaderGroup): boolean;

  /** Toggles the exanded state of the selected header. */
  toggle(header: SohoAccordionHeaderGroup): boolean;

  /**
   * Gets the current contents of this accordion and creates a JSON-like representation of the structure.
   * For full JSON compatibility, don't use the `addElementReference` flag.
   **/
  toData(flatten?: boolean, addElementReference?: boolean): SohoAccordionData;

  /** Makes an accordion header appear with a "selected" state */
  select(element?: SohoAccordionHeaderAnyGroup): void;

  /** Makes an accordion header appear with a "deselected" state */
  deselect(element?: SohoAccordionHeaderAnyGroup): void;

  /** Makes all accordion headers deselected */
  deselectAll(): void;

  /** Gets a reference to currently-selected accordion headers */
  getSelected(): SohoAccordionHeaderGroup;

  /** Determines if an Accordion Header is disabled */
  isDisabled(header: SohoAccordionHeaderGroup): boolean;

  /** "Visually" filters accordion headers (elements are not added/removed but temporarily hidden by CSS if filtered out) */
  filter(headers?: SohoAccordionHeaderGroup): void;

  /** Resets a previously-applied filter */
  unfilter(headers?: SohoAccordionHeaderGroup): void;

  /** Determines if an Accordion Header is currently visually filtered out */
  isFiltered(header: SohoAccordionHeaderGroup): boolean;

  /** Determines if animation is currently happening on accordion panes (controls some behavior internally) */
  isAnimating: boolean;

  /** Programmatically navigates to the next-available accordion header (down) */
  nextHeader(element: SohoAccordionHeaderAnyGroup, noDescend?: boolean): void;

  /** Programmatically navigates to the previous-available accordion header (up) */
  prevHeader(element: SohoAccordionHeaderAnyGroup, noDescend?: boolean): void;

  /** Programmatically navigates to the next-available accordion header (down) */
  ascend(element: SohoAccordionHeaderGroup, direction?: SohoAccordionNavDirection): void;

  /** Programmatically navigates to the previous-available accordion header (up) */
  descend(element: SohoAccordionHeaderGroup, direction?: SohoAccordionNavDirection): void;

  /** Programmatically focuses the correct element within an accordion header (based on previously-focused elements) */
  focusOriginalType(header: SohoAccordionHeaderGroup): void;

  /** Updates the accordion with any new settings. */
  updated(headers?: SohoAccordionHeaderGroup, settings?: SohoAccordionOptions): void;

  /** Performs a teardown of the jQuery component API (does not remove the component instance) */
  teardown(): void;

  /** Destroys the control on completion. (Tears down and removes the component instance) */
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
