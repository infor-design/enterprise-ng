/**
 * Soho Autocomplete.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Autocomplete control.
 */

/**
 * Autocomplete Options
 */
interface SohoAutoCompleteOptions {
  /** Defines the data to use, must be specified. */
  source?: SohoAutoCompleteSource;

  /** If a source method is defined, this flexible object can be passed into the source method, and augmented with parameters specific to the implementation. */
  sourceArguments?: string;

   /** If defined, use this to draw the contents of each search result instead of the default draw routine. */
  template?: string;

  /** startsWith and contains Supported - false will not client side filter. */
  filterMode?: SohoAutoCompleteFilterMode;

  /** The delay between key strokes on the keypad before it thinks you stopped typing */
  delay?: number;

  /** width of the auto complete menu. */
  width?: number | string;

  /** left or top offset */
  offset?: number | string;

  autoSelectFirstItem?: boolean;
 }
 type SohoAutoCompleteSource = Object[] | string | Object | SohoAutoCompleteSourceFunction;

 type SohoAutoCompleteResponseFunction = (term: string, data: any[]) => void;

 type SohoAutoCompleteSourceFunction = (term: string, response: SohoAutoCompleteResponseFunction) => void;

 type SohoAutoCompleteFilterMode = 'startsWith' | 'contains';

 type SohoAutoCompleteWidth = number | string;
 type SohoAutoCompleteOffset = number | string;

 interface SohoAutoCompleteStatic {
   /** Destructor. */
   destroy(): void;

   /** Clear. */
   clear(): void;
 }

interface JQueryStatic {
  autocomplete: SohoAutoCompleteStatic;
}

interface JQuery {
  autocomplete(options?: SohoAutoCompleteOptions): JQuery
}
