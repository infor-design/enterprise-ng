/**
 * JQuery Hyperlink Control.
 * Soho does not provide a control api for hyperlink.
 */

interface SohoHyperlinkEvent extends JQuery.TriggeredEvent {
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  hideFocus(): JQuery;
}
