/**
 * Soho DataGrid Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery datagrid control.
 */

/**
 * Possible row height options.
 */
type SohoDataGridRowHeight = 'short' | 'medium' | 'normal';

/**
 * Selection options.
 */
type SohoDataGridSelectable = boolean | 'single' | 'multiple';

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
  rowHeight?: SohoDataGridRowHeight;

  /** Sets the select-ability for the datagrid. */
  selectable?: SohoDataGridSelectable;

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

  /**
   * Used to hold an object that can be referenced in formatters
   * and editors or anywhere else a datagrid reference is available
   */
  userObject?: any;
}

/**
 * Soho Data Grid Paging Options.
 *
 * @deprecated replaced with SohoPagerPagingInfo
 */
interface SohoDataGridPageInfo extends SohoPagerPagingInfo {
}

interface SohoDataGridSourceRequest extends SohoPagerPagingInfo {
  filterExpr: {
    column?: 'all' | string;
    lowercase?: 'yes' | 'no';
    operator?: 'contains' | string;
    value?: string;
  }[];
  sortAsc?: boolean;
  sortField?: string;
  sortId?: string;
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

type SohoDataGridSortFunction = (
  id: number,
  ascending: boolean
) => boolean;

type SohoDataGridColumnFilterType = 'text' | 'checkbox' | 'contents' | 'date' | 'decimal' | 'integer' | 'lookup' | 'percent' | 'select';

type SohoDataGridColumnEditorFunction = (
  row?: any,
  cell?: any,
  value?: any,
  container?: any,
  column?: SohoDataGridColumn,
  event?: any,
  grid?: any,
  item?: any
) => string;

declare var Editors: {
  // Supports, Text, Numeric, Integer via mask
  Input: SohoDataGridColumnEditorFunction;
  Textarea: SohoDataGridColumnEditorFunction;
  Checkbox: SohoDataGridColumnEditorFunction;
  Dropdown: SohoDataGridColumnEditorFunction;
  Date: SohoDataGridColumnEditorFunction;
  Lookup: SohoDataGridColumnEditorFunction;
  Autocomplete: SohoDataGridColumnEditorFunction;
};

type SohoDataGridColumnFormatterFunction = (
  /** Row number. */
  row: number,

  /** Column id. */
  cell: any,

  /** Field value */
  fieldValue: any,

  /** Column Definition. */
  columnDef: SohoDataGridColumn,

  /** Row data */
  rowData: Object,

  /** dataGrid */
  api: SohoDataGridStatic
) => any;

declare var Formatters: {
  /** Text base column data. */
  Text: SohoDataGridColumnFormatterFunction;
  Readonly: SohoDataGridColumnFormatterFunction;
  Date: SohoDataGridColumnFormatterFunction;
  Autocomplete: SohoDataGridColumnFormatterFunction;
  Lookup: SohoDataGridColumnFormatterFunction;
  Decimal: SohoDataGridColumnFormatterFunction;
  Integer: SohoDataGridColumnFormatterFunction;
  Hyperlink: SohoDataGridColumnFormatterFunction;
  Template: SohoDataGridColumnFormatterFunction;
  Drilldown: SohoDataGridColumnFormatterFunction;
  Password: SohoDataGridColumnFormatterFunction;
  TextArea: SohoDataGridColumnFormatterFunction;
  Checkbox: SohoDataGridColumnFormatterFunction;
  SelectionCheckbox: SohoDataGridColumnFormatterFunction;
  Actions: SohoDataGridColumnFormatterFunction;
  Expander: SohoDataGridColumnFormatterFunction;
  ClassRange: SohoDataGridColumnFormatterFunction;
  Badge: SohoDataGridColumnFormatterFunction;
  Tag: SohoDataGridColumnFormatterFunction;
  Alert: SohoDataGridColumnFormatterFunction;
  Image: SohoDataGridColumnFormatterFunction;
  Color: SohoDataGridColumnFormatterFunction;
  Button: SohoDataGridColumnFormatterFunction;
  Dropdown: SohoDataGridColumnFormatterFunction;
  Favorite: SohoDataGridColumnFormatterFunction;
  Status: SohoDataGridColumnFormatterFunction;
  Tree: SohoDataGridColumnFormatterFunction
};

// declare var Formatters as SohoDataGridColumnFormatters;

type SohoDataGridColumnHrefFunction = (
  row: any,
  cell: any,
  col: SohoDataGridColumn,
  value: any
 ) => string;

 type SohoDataGridColumnHref = string | SohoDataGridColumnHrefFunction;

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

  /** Column formatter function or a string.  */
  formatter?: SohoDataGridColumnFormatterFunction | string;

  /** Icon to use. */
  icon?: string;

  /** Name of the editor to instantiate (using new), or a SohoDataGridColumnEditorFunction. */
  editor?: SohoDataGridColumnEditorFunction | string;

  /** Options associated with the associated editor type, e.g. SohoDropDownOptions. */
  editorOptions?: any;

  // 'checkbox', 'date', 'decimal', 'contents', 'select' otherwise a string.
  filterType?: SohoDataGridColumnFilterType | string;

  /** Column formatter function.  */
  filterFormatter?: SohoDataGridColumnFormatterFunction | string;

  caseSensitive?: boolean;

  // String array or an array of objects with a value method used for filters and editors.
  options?: SohoGridCellOption[];

  /** css class  */
  cssClass?: string;

  /** @todo fix type from any.  */
  dateShowFormat?: any;

  /** @todo fix type from any.  */
  sourceFormat?: any;

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

  /** Resizable column */
  resizable?: boolean;

  /** @todo fix type from any.  */
  children?: any[];

  /** The name of the property that controls whether a row is expanded or not. */
  expanded?: string;

  /** href for hyperlink */
  href?: SohoDataGridColumnHref;
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

  /** Overridable sort function. */
  sortFunction: SohoDataGridSortFunction;

  /** Reference to pager. */
  pager: SohoPagerStatic;

  /** Updates the dataset displayed by the data grid. */
  updateDataset(dataset: Object[]): void;

  /** Sets the row height on the datagrid. */
  rowHeight(rowHeight: SohoDataGridRowHeight): void;

  /** Loads the dataset display by the grid. */
  loadData(dataset: Object[]): void;

  /** Updates the columns displayed on the grid. */
  updateColumns(columns: SohoDataGridColumn[]): void;

  /** The grouping  name of the given column idx. */
  getColumnGroup(idx: number): string;

  /** Updates the pager associated with the grid. */
  updatePagingInfo(pagerInfo: SohoPagerPagingInfo): void;

  /** Updates the data displayed in the given row. */
  updateRow(idx: number, rowData: Object): void;

  /** Hides the column at the given index.  */
  hideColumn(idx: number): void;

  /** Shows the column at the given index.  */
  showColumn(idx: number): void;

  /** Used to set the sort indicator on a column when disableClientSort is set to true */
  setSortIndicator(columnId: string, ascending: boolean): void;

  columnById(id: string): Array<any>;

  getColumnIndex(columnId: string): number;

  getHeaderRowColumn(fld: any): any;

  addRow(data: Object, location: any): void;

  removeRow(data: Object): void;

  removeSelected(): void;

  clearFilter(): void;

  selectedRows(): SohoDataGridSelectedRow[];

  selectAllRows(): void;

  unSelectAllRows(): void;

  selectRow(idx: number): void;

  unselectRow(idx: number): void;

  selectRowsBetweenIndexes(range: number[]);

  selectedRows(rows: number[]): void;

  toggleFilterRow(): void;

  setActiveCell(idx: number, idx2: number): void;

  renderHeader(): void;

  renderRows(): void;

  triggerSource(pagerType: 'initial' | 'refresh' | 'filtered' | 'sorted' | 'updatecolums' | string): void;

  exportToExcel(fileName: string, worksheetName: string, customDs: Object[]): void;

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
