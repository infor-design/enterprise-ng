/**
 * Soho Header.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho header control.
 */

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoHeaderStatic {
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
  header: SohoHeaderStatic;
}

interface JQuery {
  header(): JQuery;
}

/**
 * Type safe event.
 */
interface SohoExpandableAreaEvent extends JQuery.Event {
}
