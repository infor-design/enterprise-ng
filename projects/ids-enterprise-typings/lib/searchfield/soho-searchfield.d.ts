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
  categories?: SohoSearchFieldCategoryType[];

  /** If true, creates a multiselectable Categories list. */
  categoryMultiselect?: boolean;

  /** If true, will show any available categories that are selected to the left of the Dropdown field. */
  showCategoryText?: boolean;

  /* *Has an X to clear? */
  clearable?: boolean;

  /* Add extra button in searchfield */
  button?: SohoSearchFieldExtraButton;

  /* Is able to be collapsed */
  collapsible?: boolean;

  /* Can either be a number, or a function resolving a number */
  collapseSize?: ((api: SohoSearchFieldStatic) => number) | number;

  /* Set the trigger inputs to tabbable */
  tabbable?: boolean;
}

interface SohoSearchFieldExtraButton {
  /* Icon to Show */
  icon?: string;

  /* Click Function */
  click?: ((e: JQuery.ClickEvent, value: any) => void);

  /* Id to use*/
  id?: string;
}

/**
 * Soho control seachfield api.
 */
interface SohoSearchFieldStatic {
  /**  Gets a complete list of categories in jQuery-collection form. */
  getCategories(): any;

  /** Gets the currently selected categories as data */
  getCategoryData(onlySelected: boolean): SohoSearchFieldCategory[];

  /**  Gets a complete list of categories in jQuery-collection form. */
  getSelectedCategories(): any;

  /** Gets the currently selected list of categories in jQuery-collection form. */
  setCategoryButtonText(textContent?: string): void;

  /** Category Button */
  categoryButton?: JQuery;

  /** Internal element reference */
  element: JQuery;

  /** If this component resides within a toolbar, this returns `true` */
  toolbarParent?: boolean;

  /** Destructor. */
  destroy(): void;

  /** Clear */
  clear(): void;

  /** Updated */
  updated(settings?: SohoSearchFieldOptions): void;
}

/**
 * Search field category.
 */
interface SohoSearchFieldCategory {
  checked: boolean;
  name: string;
  id?: string | number;
  value?: string | number;
}

/** Search field category type */
type SohoSearchFieldCategoryType = SohoSearchFieldCategory | string;

/**
 * Type safe SearchField event object.
 */
interface SohoSearchFieldEvent extends JQuery.TriggeredEvent {
  data: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  searchfield: SohoSearchFieldStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  searchfield(options?: SohoSearchFieldOptions): JQuery;
}
