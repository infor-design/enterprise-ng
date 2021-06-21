/**
 * Soho Card.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho Card control.
 */

/**
  * Card Options
  */
interface SohoCardOptions {
  /** Identifier */
  id?: string;
  expandableHeader?: boolean;
  verticalButtonAction?: boolean;
  expanded?: boolean;
  autoHeight?: boolean;
  /** Add extra attributes like id's to the component */
  attributes?: Array<Object> | Object;
}

/**
 * Interface represents the public API
 */
interface SohoCardStatic {
  /**
   * Opens the expandable card.
   */
  open(): void;
  /**
   * Closes the expandable card.
   */
  close(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  card: SohoCardStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  cards(options?: SohoCardOptions): JQuery;
}

/**
 * Type safe event.
 */
interface SohoCardEvent extends JQuery.TriggeredEvent { }
