/**
 * JQuery Radio Button Control.
 *
 * Soho does not provide a control api for radio button.
 */

interface SohoRadioButtonEvent extends JQuery.Event {
  data: any
}

interface JQuery {
  on(events: string,
    handler: JQuery.EventHandlerBase<any, SohoRadioButtonEvent>): this;
}