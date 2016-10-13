/**
 * Soho List View.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery listview control.
 */

type SohoListViewOptionsSelectable = false | 'single' | 'multiple';

interface SohoListViewOptions {
  /** Data to display. */
  dataset?: Object[];

  /** Html template string */
  template?: string;

  /** Audible label (or uses parent title). */
  description?: string;

  /** Activates paging. */
  paging?: boolean;

  /** Sets the number of listview items available per page. */
  pagesize?: number;

  /** If true, associates itself with a Searchfield/Autocomplete and allows itself to be filtered */
  searchable?: boolean;

  /** Selection setting. */
  selectable?: SohoListViewOptionsSelectable;

  /** Select on focus? */
  selectOnFocus?: boolean;

  /** URL or source function. */
  source?: SohoListViewOptionsSourceFunction | string;
}

/** @todo split int request and response? */
interface SohoListViewOptionsPagerInfo {
  pagesize?: number;
  pageSize?: number;
  firstPage?: boolean;
  lastPage?: boolean;
  activePage?: number;
  total?: number;
  type?: string;
  preserveSelected?: boolean;
}

type SohoListViewOptionsSourceFunction = (
  pagerInfo: SohoListViewOptionsPagerInfo,
  SohoListViewOptionsResponseFunction
) => void;

type SohoListViewOptionsResponseFunction = (
  data: Object[],
  pagerInfo: SohoListViewOptionsPagerInfo
) => void;

/**
 * This interface represents the public API exposed by the
 * listview.
 */
interface SohoListViewStatic {
  /** Access to the control's options block. */
  settings: SohoListViewOptions;

  /** Toggles all the selected elements. */
  toggleAll(): void;

  /** ClearToggles all the selected elements. */
  clearSelection(): void;

  /** Clear the list. */
  clear(): void;

  removeAllSelected(): void;

  clearAllSelected(): void;

  /** Updates the busy indicator with any new seettings. */
  updated(): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  listview: SohoListViewStatic;
}

interface JQuery {
  listview(options?: SohoListViewOptions): JQuery;
}
