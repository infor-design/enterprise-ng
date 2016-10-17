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
type SohoPagerOptionsType = 'list' | 'table' | string;

/**
 * Pager location.
 */
type SohoPagerOptionsPosition = 'bottom' | 'top';

/**
 * Soho Page control options.
 */
interface SohoPagerOptions {
  /** Type of pager - list, table and more. */
  type?: SohoPagerOptionsType;

  /** Position of the pager.  */
  position: SohoPagerOptionsPosition;

  /** Current page. */
  activePage?: number;

  /** Source Function */
  source?: SohoDataGridSourceFunction;

  /** Page size */
  pagesize?: number; // 15, //Can be calculate or a specific number

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

  /** The first page. */
  firstPage?: number;

  /** Last page (if present) */
  lastPage?: number;

  /** Internal paging information */
  type?: 'initial' | 'filtered' | 'sorted' | 'updatecolums' | string;

  /** Preserve the selected page (passed from pager to grid) */
  preserveSelected?: boolean;
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
