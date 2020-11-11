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

  /** Remove the message from the field if there is one and mark the field valid */
  removeMessage(field: any, type: any): void;

  /** Trigger validation of the field */
  validate(field: any, showTooltip: any, event: any): void;

  destroy(): void;
}

/**
 * Type safe Input Validate event object.
 */
interface SohoInputValidateEvent extends JQuery.TriggeredEvent {
  event: JQuery.TriggeredEvent;
  validation: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  validation: SohoInputValidateStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  validate(): JQuery;
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoInputValidateEvent>): this;
}
