/**
 * Soho Card.
 * 
 * This file contains the TypeScript mappings for the public
 * interface of the Soho Card control.
 */

/**
 * Card Options
 */

type SohoCardsSelectable = boolean | 'single' | 'multiple' | undefined;

interface SohoCardOptions {
  /** Identifier */
  id?: string;

  /** Abilty to expand the card header */
  expandableHeader?: boolean;

  /** Ability to rotate the button action vertically */
  verticalButtonAction?: boolean;

  expanded?: boolean;

  /** Sets the card's height automatically */
  autoHeight?: boolean;

  /** An array of data objects that will be represented as cards */
  dataset?: Array<any>;

  /** Html template string */
  template?: string;

  /** Ability to enable the selection state e.g. 'single', 'multiple' or false */
  selectable?: SohoCardsSelectable;

  /** Add extra attributes like id's to the component */
  attributes?: Array<Object> | Object;
}

/**
 * Interface represents the public API
 */
interface SohoCardStatic {
  settings: SohoCardOptions;

  select(activeCard: JQuery<Node[] | Node>): void;

  /**
   * Opens the expandable card.
   */
  open(): void;
  /**
   * Closes the expandable card.
   */
  close(): void;

  /** Updates tha card with any new settings. */
  updated(settings?: SohoCardOptions): void;
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
