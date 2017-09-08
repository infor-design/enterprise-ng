/**
 * Soho Input Validate.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho Input Validate directive.
 */

/**
 * This interface represents the public API exposed by
 * Soho Input Validate.
 */
interface SohoInputValidateStatic {

  /** Underlying element. */
  element: JQuery;

  destroy(): void;
}

/**
 * Type safe Input Validate event object.
 */
interface SohoInputValidateEvent extends JQueryEventObject {
  event: JQueryEventObject,
  validation: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  validation: SohoInputValidateStatic;
}

interface JQuery {
  validate(): JQuery;
}
