/**
 * Soho Expandable Area.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho expandablearea control.
 */

/**
 * Expandable Area Options
 */
interface SohoExpandableAreaOptions {
  /** Identifier. */
  id?: string;
  disabled?: boolean;
  expanded?: boolean;
  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoExpandableAreaStatic {
  /**
   * Disable the control.
   */
  disable(): void;

  /**
   * Enable the control.
   */
  enable(): void;

  /**
   * Mark the control as readonly.
   */
  readonly(): void;

  /**
   * Opens the expanded area.
   */
  open(): void;

  /**
   * Closes the exanded area.
   */
  close(): void;

  /**
   * Destroys any resources created by this control.
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  expandablearea: SohoExpandableAreaStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  expandablearea(options?: SohoExpandableAreaOptions): JQuery;
}

/**
 * Type safe event.
 */
interface SohoExpandableAreaEvent extends JQuery.TriggeredEvent {
}
