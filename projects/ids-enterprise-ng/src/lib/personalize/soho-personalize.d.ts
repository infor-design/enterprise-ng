/**
 * Soho Personalize Control Typings.
 *
 * This component has no Soho api.
 */

/**
 * Configuration options.
 */
interface SohoPersonalizeOptions {
  colors?: string,
  theme?: string
}

interface SohoPersonalizeEvent extends JQuery.Event {
  data: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  personalize(options?: SohoPersonalizeOptions): JQuery;
}
