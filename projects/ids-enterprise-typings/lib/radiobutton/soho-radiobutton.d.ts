/**
 * JQuery Radio Button Control.
 *
 * Soho does not provide a control api for radio button.
 */

interface SohoRadioButtonEvent extends JQuery.TriggeredEvent {
  data: any;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  on(events: string,
    handler: JQuery.EventHandlerBase<TElement, SohoRadioButtonEvent>): this;
}
