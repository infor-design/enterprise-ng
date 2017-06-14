/**
 * JQuery Integration
 */
interface JQueryStatic {
  accordion: any;
}

interface JQuery {
  accordion(options?: SohoAccordionOptions): JQuery;
}

interface SohoAccordionOptions {
  allowOnePane?: boolean;
  displayChevron?: boolean;
  rerouteOnLinkClick?: boolean;
  source?: Function;
}

interface SohoAccordionEvent extends JQueryEventObject {
  anchor: HTMLAnchorElement;
}

