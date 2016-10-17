/**
 * Soho Personalize Control Typings.
 *
 * This component has no Soho api.
 */

/**
 * Configuration options.
 */
interface SohoPersonalizeOptions {
  /** Specifies the starting colour. */
  startingColor?: string;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
 // personalize: SohoPersonalizeStatic;
}

interface JQuery {
  personalize(options?: SohoPersonalizeOptions): JQuery;
}
