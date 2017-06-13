/**
 * JQuery Integration
 */
interface JQueryStatic {
  accordion: any;
}

interface JQuery {
  accordion(options?: any): JQuery;
}

interface SohoAccordionEvent extends JQueryEventObject {
  anchor: any;
}

