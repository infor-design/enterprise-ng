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
type SohoPagerType = 'list' | 'table' | 'standalone' | string;

/**
 * Pager location.
 */
type SohoPagerPosition = 'bottom' | 'top';

interface SohoStandalonePagerOptions {
  type?: 'standalone';

  /** curreent pagesize of page chooser dropdown  */
  pagesize?: number;

  /** list of possible page sizes for the page chooser dropdown */
  pagesizes?: number[];

  /** display first button */
  showFirstButton?: boolean;

  /** display last button */
  showLastButton?: boolean;

  /** display previous button */
  showPreviousButton?: boolean;

  /** display next button */
  showNextButton?: boolean;

  /** display page size selector field */
  showPageSizeSelector?: boolean;

  /** display small page size selector field */
  smallPageSizeSelector?: boolean;

  /** enable first button */
  enableFirstButton?: boolean;

  /** enable next button */
  enableLastButton?: boolean;

  /** enable previous button */
  enablePreviousButton?: boolean;

  /** enable next button */
  enableNextButton?: boolean;

  /** first button tooltip */
  firstPageTooltip?: string;

  /** last button tooltip */
  lastPageTooltip?: string;

  /** previous button tooltip */
  previousPageTooltip?: string;

  /** next button tooltip */
  nextPageTooltip?: string;

  /**
   * whether to attach the popup menu to the body or not.
   * This helps with safari iOS in many cases.
   */
  attachPageSizeMenuToBody?: boolean;

  /**
   * whether to attach the popup menu to the body or not.
   * This helps with safari iOS in many cases.
   */
  pageSizeMenuSettings?: SohoPagerPageSizeMenuOptions;
}

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

interface SohoPagerPageSizeMenuOptions {
  attachToBody?: boolean;
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

  /** Updates the pager associated with the grid. */
  updatePagingInfo(pagerInfo: SohoPagerPagingInfo): void;
}

interface SohoStandalonePagerStatic {
  /** Accessible settings - for updates. */
  settings: SohoStandalonePagerOptions;

  /** Internal jQuery element. */
  element: JQuery;

  /** call updated when options change after the pager has been initialized */
  updated(SohoStandalonePagerOptions): void;

  /** call from ngOnDestroy to ensure any resources the pager uses are cleaned up */
  destroy();
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  pager: SohoPagerStatic | SohoStandalonePagerStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  pager(options?: SohoPagerOptions | SohoStandalonePagerOptions): JQuery;
}
