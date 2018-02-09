/**
 * Soho Searchfield Control Typings.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery searchfield control.
 */

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
 * Type safe SearchField event object.
 */
interface SohoSearchFieldEvent extends JQuery.Event {
  data: any;
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
