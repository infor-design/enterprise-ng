/**
 * Soho Searchfield Control Typings.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery searchfield control.
 */

/** AUTOCOMPLETE
 *
 * @todo autocomplete interface
*/
interface SohoAutoCompleteOptions {
 /** Defines the data to use, must be specified. */
 source?: SohoAutoCompleteSource;

  /** If defined, use this to draw the contents of each search result instead of the default draw routine. */
 template?: string;

 /** startsWith and contains Supported - false will not client side filter. */
 filterMode?: 'startsWith' | 'contains';

 /** The delay between key strokes on the keypad before it thinks you stopped typing */
 delay?: number;

 /** width of the auto complete menu. */
 width?: number;

 /** left or top offset */
 offset?: number | string;
}

type SohoAutoCompleteSource = Object[] | string | Object | SohoAutoCompleteSourceFunction;

type SohoAutoCompleteResponseFunction = (searchTerm: string, data: any[]) => void;

type SohoAutoCompleteSourceFunction = (searchTerm: string, response: SohoAutoCompleteResponseFunction) => void;

/**
 * Configuration options.
 */
interface SohoSearchFieldOptions extends SohoAutoCompleteOptions {
  /** All results callback - @todo prototype! */
  allResultsCallback?: (searchTerm: string) => void;

  /** Shows all results? */
  showAllResults?: boolean;

  /** Displays a dropdown containing categories that can be used to filter results. */
  categories?: Object[];

  /** If true, creates a multiselectable Categories list. */
  categoryMultiselect?: boolean;

  /** If true, will show any available categories that are selected to the left of the Dropdown field. */
  showCategoryText?: boolean;

  /* *Has an X to clear? */
  clearable?: boolean;
}

/**
 * Soho control seachfield api.
 */
interface SohoSearchFieldStatic {
  /** Destructor. */
  destroy(): void;

  /** Clear */
  clear(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  searchfield: SohoSearchFieldStatic;
}

interface JQuery {
  searchfield(options?: SohoSearchFieldOptions): JQuery;
}
