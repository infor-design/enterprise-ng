/**
 * Soho Pager Control.
 *
 * The pager control is used by the grid (and other controls) to allow the data
 * to be paged through.
 *
 * This control does not have a specific wrapper of its own.
 */

/**
 * Pager options.
 */
type SohoPagerType = 'list' | 'table' | string;

/**
 * Pager location.
 */
type SohoPagerPosition = 'bottom' | 'top';

/**
 * Soho Page control options.
 */
interface SohoPagerOptions {
  /** Type of pager - list, table and more. */
  type?: SohoPagerType;

  /** Position of the pager.  */
  position: SohoPagerPosition;

  /** Current page. */
  activePage?: number;

  /** Source Function */
  source?: SohoDataGridSourceFunction;

  /** Page size - @todo soho may support 'calculate' at some point.*/
  pagesize?: number;

  /** Page size options. */
  pagesizes?: number[]; // [15, 25, 50, 75],

  /**  Will not show anything that lets you go to a specific page.  */
  indeterminate?: boolean;
}

/**
 * Updates the paging information, and passed into loadData of any attached
 * data grid.
 *
 * <code>datagrid.updatePagingInfo(pagingInfo);</code>
 */
interface SohoPagerPagingInfo {
  /** The total number of pages. */
  total?: number;

  /** The size of the page. */
  pagesize?: number;

  /** The page returned. */
  activePage?: number;

  /** Used by indeterminate paging as an indicator of whether this is the firstPage in the set. */
  firstPage?: boolean;

  /** Used by indeterminate paging as an indicator of whether this is the lastPage in the set. */
  lastPage?: boolean;

  /** Internal paging information */
  type?: 'initial' | 'filtered' | 'sorted' | 'updatecolums' | string;

  /** Preserve the selected page (passed from pager to grid) */
  preserveSelected?: boolean;

  /** Causes the pager to become completely hidden if both firstPage and lastPage are true */
  hideDisabledPagers?: boolean;
}

interface SohoPagerStatic {
  /** Accessible settings - for updates. */
  settings: SohoPagerOptions;

  /** Internal jQuery element. */
  element: JQuery;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  pager: SohoPagerStatic;
}

interface JQuery {
  pager(options?: SohoPagerOptions): JQuery;
}
