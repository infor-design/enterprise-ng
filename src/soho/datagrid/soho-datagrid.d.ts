/**
 * Soho DataGrid Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery datagrid control.
 */

/**
 * Possible row height options.
 */
type SohoDataGridOptionsRowHeight = 'short' | 'medium' | 'normal';

/**
 * Selection options.
 */
type SohoDataGridOptionsSelectable = false | 'single' | 'multiple';

/**
 * Settings for the Soho datagrid control.
 */
interface SohoDataGridOptions {
  /** Which column property is the rows identifier? */
  idProperty?: string;

  /**
   * F2 - toggles actionableMode "true" and "false"
   * If actionableMode is "true”, tab and shift tab behave like left and right arrow key,
   * if the cell is editable it goes in and out of edit mode
   */
  actionableMode?: boolean;

  /** If cellNavigation is "false”, will show border around whole row on focus. */
  cellNavigation?: boolean;

  /** If rowNavigation is "false”, will NOT show a border around the row */
  rowNavigation?: boolean;

  /** Sets shading for readonly grids. */
  alternateRowShading?: boolean;

  /** List of columns definitions. */
  columns?: SohoDataGridColumn[];

  /** ?? */
  // data?: Object[];

  /** Initial dataset. */
  dataset?: Object[];

  /** Allow column reorder. */
  columnReorder?: boolean;

  /** Save Column Reorder and resize. */
  saveColumns?: boolean;

  /** Is the grid editable? */
  editable?: boolean;

  /** Makes a readonly "list". */
  isList?: boolean;

  /** Id to the right click context menu */
  menuId?: string;

  /** What height to make the rows? */
  rowHeight?: SohoDataGridOptionsRowHeight;

  /** Sets the select-ability for the datagrid. */
  selectable?: SohoDataGridOptionsSelectable;

  /** Click to select, or via checkbox? */
  clickToSelect?: boolean;

  /** Toolbar options. */
  toolbar?: boolean | SohoToolbarOptions;

  /** Paging Options. */
  paging?: boolean;

  /** Single page size. */
  pagesize?: number;

  /** Size of a page options */
  pagesizes?: number[];

  /** Remove ability to go to a specific page. */
  indeterminate?: boolean;

  /** Callback for paging. */
  source?: SohoDataGridSourceFunction;

  /** Add filter bar? */
  filterable?: boolean;

  /** Display as a tree grid? */
  treeGrid?: boolean;

  /** Disable Filter Logic client side and let your server do it */
  disableClientFilter?: boolean;

  /** Disable Sort Logic client side and let your server do it */
  disableClientSort?: boolean;

  /** Can provide a custom function to adjust results text */
  resultsText?: SohoDataGridResultsTextFunction;
}

/**
 * Soho Data Grid Paging Options.
 */
interface SohoDataGridPageInfo {
  pagesize?: number;
  pageSize?: number;
  firstPage?: boolean;
  lastPage?: boolean;
  activePage?: number;
  total?: number;
  type?: string;
  preserveSelected?: boolean;
}

interface SohoDataGridSourceRequest {
  activePage: number;
  pagesize: number;
  type: string;
  total: number;
  filterExpr: {
    column?: 'all' | string;
    lowercase?: 'yes' | 'no';
    operator?: 'contains' | string;
    value?: string;
  }[];
  preserveSelected?: boolean;
  sortAsc?: boolean;
  sortField?: string;
  sortId?: string;
  firstPage?: boolean;
  lastPage?: boolean;
}

type SohoDataGridSourceFunction = (
  request: SohoDataGridSourceRequest,
  response: SohoDataGridResponseFunction
) => void;

type SohoDataGridResponseFunction = (
  results: Object[],
  request: SohoDataGridSourceRequest
) => void;

type SohoDataGridResultsTextFunction = (
  source: any,
  count: number
) => {};

type SohoGridColumnFilterType = 'text' | 'checkbox' | 'contents' | 'date' | 'decimal' | 'integer' | 'lookup' | 'percent' | 'select';

type SohoDataGridColumnEditorFunction = (
  row: any,
  cell: any,
  value: any,
  container: any,
  column: SohoDataGridColumn,
  event?: any,
  grid?: any,
  item?: any
) => string;

declare var SohoDataGridColumnEditors: {
  // Supports, Text, Numeric, Integer via mask
  Input: SohoDataGridColumnEditorFunction;
  Textarea: SohoDataGridColumnEditorFunction;
  Checkbox: SohoDataGridColumnEditorFunction;
  Dropdown: SohoDataGridColumnEditorFunction;
  Date: SohoDataGridColumnEditorFunction;
  Lookup: SohoDataGridColumnEditorFunction;
  Autocomplete: SohoDataGridColumnEditorFunction;
};

/**
 * This is an interface mapping for the grid column defined
 * within the Soho jQuery Control.
 */
interface SohoDataGridColumn {
  /** Identifier for the grid columns. */
  id?: string;

  /** Displayed column name. */
  name?: string;

  /** Field in the row to display. */
  field?: string;

  /** Is this column visible? */
  hidden?: boolean;

  /** Is the column sortable? */
  sortable?: boolean;

  /** Width of the column (in pixels) or a string value for the width. */
  width?: number  | string;

  /** @todo fix type from any.  */
  align?: any;

  /** Tooltip for the column header. */
  headerTooltip?: string;

  /** @todo fix type from any.  */
  formatter?: any;

  /** Icon to use. */
  icon?: string;

  /**
   * Name of the editor to instantiate (using new), or a SohoDataGridColumnEditorFunction.
   */
  editor?: SohoDataGridColumnEditorFunction | string;

  /** @todo fix type from any.  */
  editorOptions?: any;

  // 'checkbox', 'date', 'decimal', 'contents', 'select' otherwise a string.
  filterType?: SohoGridColumnFilterType | string;

  /** @todo fix type from any.  */
  filterFormatter?: any;

  caseSensitive?: boolean;
  // String array or an array of objects with a value method used for filters and editors.
  options?: SohoGridCellOption[];

  /** css class  */
  cssClass?: string;

  /** @todo fix type from any.  */
  dateShowFormat?: any;

  /** @todo fix type from any.  */
  dateSourceFormat?: any;

  /** @todo fix type from any.  */
  click?: any;

  /** Is the grid searchable. */
  searchable?: boolean;

  /** @todo fix type from any.  */
  inputType?: any;

  /** @todo fix type from any.  */
  dateFormat?: string;

  /** @todo fix type from any.  */
  ranges?: any;

  /** @todo fix type from any.  */
  menuId?: any;

  /** @todo fix type from any.  */
  selected?: any;

  resizable?: boolean;

  /** @todo fix type from any.  */
  children?: any[];

  /** The name of the property that controls whether a row is expanded or not. */
  expanded?: string;
}

interface SohoGridCellOption {
  /** The underlying data value. */
  value: any;
  /** The localised display value. */
  label: string;
}

/**
 * This interface represents the pub Api exposed by the
 * Soho datagrid control.
 */
interface SohoDataGridStatic {
  /** Control options. */
  settings: SohoDataGridOptions;

  /**
   * Destructor,
   */
  destroy(): void;
}

/**
 * Details of the 'sorted' event.
 */
interface SohoDataGridSortedEvent {
  // The column that was sorted.
  column: SohoDataGridColumn;
}

interface SohoDataGridSelectedRow {
  idx: number;
  data: any;
  element: HTMLElement;
}

interface SohoDataGridSelectedEvent {
  e: any;
  rows: SohoDataGridSelectedRow[];
}

interface SohoDataGridCellChangeEvent {
  row?: any;
  cell?: any;
  target?: any;
  value?: any;
  oldValue?: any;
  column?: any;
}

interface SohoDataGridRowRemoveEvent {
  row: any;
  cell: any;
  target: any;
  value: any;
  oldValue: any;
}

interface SohoDataGridAddRowEvent {
  row: any;
  cell: any;
  target: any;
  value: any;
  oldValue: any;
}

/**
 * Move to toolbar!
 */
interface SohoToolbarOptions {
  actions?: any | any[];
  advancedFilter?: boolean;
  collapsibleFilter?: boolean;
  dateFilter?: boolean;
  filterRow?: boolean;
  keywordFilter?: boolean;
  personalize?: boolean;
  results?: boolean;
  rowHeight?: boolean;
  title?: string;
  views?: boolean;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  datagrid: SohoDataGridStatic;
}

interface JQuery {
  datagrid(options?: SohoDataGridOptions): JQuery;
}
