/**
 * JQuery Radio Button Control.
 *
 * Soho does not provide a control api for radio button.
 */

interface SohoRadioButtonEvent extends JQuery.Event {
  data: any
}

interface JQuery<TElement extends Node = HTMLElement> {
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoRadioButtonEvent>): this;
}