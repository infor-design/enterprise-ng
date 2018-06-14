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
 * Mixed mode allows for single row activated state with multiple selection checkbox states.
 * rowdeactivated and rowactivated events are fired for the Activated mode of a row.
 * Use is-rowactivated in your markup to set activated state
 *
 * Siblings mode is used with treeGrid to give a mode where adgacent siblings are selected.
 */
type SohoDataGridSelectable = boolean | 'single' | 'multiple' | 'mixed' | 'siblings';

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

  /** To automatically save user settings for the grid */
  saveUserSettings?: SohoDataGridSaveUserSettings;

  /** Is the grid editable? */
  editable?: boolean;

  /** Makes a readonly "list". */
  isList?: boolean;

  /** Id to the right click context menu */
  menuId?: string;

  /** Id to the right click context menu to use for the header. */
  headerMenuId?: string;

  /** Callback for the grid level right click menu. */
  menuSelected?: Function;

  /** Call back for the grid level before open menu event. */
  menuBeforeOpen?: Function;

  /** Callback for the header level right click menu. */
  headerMenuSelected?: Function;

  /** Call back for the header level before open menu event. */
  headerMenuBeforeOpen?: Function;

  /** Unique ID for local storage reference and variable names. If not specified then the URL the page is used. */
  uniqueId?: string;

  /** What height to make the rows? */
  rowHeight?: SohoDataGridRowHeight;

  /** Sets the select-ability for the datagrid. */
  selectable?: SohoDataGridSelectable;

  /** Use Data grouping fx. {fields: ['incidentId'], supressRow: true, aggregator: 'list', aggregatorOptions: ['unitName1']} */
  groupable?: SohoDataGridGroupable;

  /** Click to select, or via checkbox? */
  clickToSelect?: boolean;

  /** Toolbar options. */
  toolbar?: boolean | SohoToolbarOptions;

  /** Can set to false if you will initialize the toolbar yourself. */
  initializeToolbar?: boolean;

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

  /** If true, hides the pager if there's only one page worth of results. */
  hidePagerOnOnePage?: boolean;

  /** whether to show the page size selector or not */
  showPageSizeSelector?: boolean; // Will show page size selector

  /** Add filter bar? */
  filterable?: boolean;

  /** Enable Column Filtering as you stop typing in inputs */
  filterWhenTyping?: boolean;

  /** Disable Filter Logic client side and let your server do it */
  disableClientFilter?: boolean;

  /** Disable Sort Logic client side and let your server do it */
  disableClientSort?: boolean;

  /** Can provide a custom function to adjust results text */
  resultsText?: SohoDataGridResultsTextFunction;

  /** Paging results will show filtered count, false to not show the filter count. */
  showFilterTotal?: boolean;

  /** Prevent Unused rows from being added to the DOM  */
  // virtualized?: boolean;

  /** How many extra rows top and bottom to allow as a buffer */
  // virtualRowBuffer?: number;

  /** Allows you to reorder rows. Requires rowReorder formatter. */
  rowReorder?: boolean;

  /**  If true the dirty indicator will be shown on the rows when they change */
  showDirty?: boolean;

  /** Allow to hide the checkbox header (true to show, false to hide) */
  showSelectAllCheckBox?: boolean;

  /** Only allows one expandable row at a time. */
  allowOneExpandedRow?: boolean;

  /** Process tooltip logic at a cost of performance. */
  enableTooltips?: boolean;

  /** If a row is activated the user should not be able to deactivate it by clicking on the activated row */
  disableRowDeactivation?: boolean;

  /** If true make all the columns equal width. */
  sizeColumnsEqually?: boolean;

  /** Supply an empty expandable row template. */
  expandableRow?: boolean;

  /** Run column redraw logic on resize. */
  redrawOnResize?: boolean;

  /** Export data with trailing negative signs moved in front. */
  exportConvertNegative?: boolean;

  /** Grouped columns*/
  columnGroups?: SohoDataGridColumnGroup[];

  /** Display as a tree grid? */
  treeGrid?: boolean;

  /**
   * Used to hold an object that can be referenced in formatters
   * and editors or anywhere else a datagrid reference is available
   */
  userObject?: any;

  /**
   * Optional callback called when a cell is rendered with the flag `postRender`
   * set to true.
   *
   * This is used by the datagrid to allow Angular Components to be used as cell
   * editors / formatters.
   * */
  onPostRenderCell?: SohoDataGridPostRenderCellFunction;

  /**
   * Optional callback called when any resources associated with a cell
   * should be destroyed, specifically in the case of components added
   * as cell formatters in Angular.
   */
  onDestroyCell?: SohoDataGridPostRenderCellFunction;

  /**
  * Optional callback called when a cell is edited with the flag `postRender`
  * set to true.
  *
  * This is used by the datagrid to allow Angular Components to be used as cell
  *
  * editors / formatters.
  */
  onEditCell?: SohoDataGridEditCellFunction;

  /**
  * A callback function that fires when expanding rows.
  * To be used when expandableRow is true.
  * The function gets eventData about the row and grid and a response
  * function callback. Call the response function with markup to append
  * and delay opening the row.
  */
  onExpandRow?: SohoDataGridExpandRowFunction;

  /**
   * An empty message will be displayed when there are no rows in the grid.
   * This accepts an object of the form SohoEmptyMessageOptions, set
   * this to null for no message or it will default to 'No Data Found with an icon.'
   */
  emptyMessage?: SohoEmptyMessageOptions;

  /**
   *  Option for tree datagrid
   *  If false children nodes will not be selected when the parent node is selected
   */
  selectChildren?: boolean;
}

/**
 * Soho Data Grid Paging Options.
 *
 * @deprecated replaced with SohoPagerPagingInfo
 */
interface SohoDataGridPageInfo extends SohoPagerPagingInfo {
}

interface SohoDataGridSourceRequest extends SohoPagerPagingInfo {
  filterExpr: Array<SohoDataGridFilterCondition>;
  sortAsc?: boolean;
  sortField?: string;
  sortId?: string;
}

/**
 * The arguments object passed to the onPostRenderCell callback.
 */
interface SohoDataGridPostRenderCellArgs {
  /** The row index. */
  row: number;

  /** The cell index. */
  cell: number;

  /** The data value. */
  value: any;

  /** The column definition. */
  col: SohoDataGridColumn;

  /** The api for the datagrid. */
  api: SohoDataGridStatic;
}

interface SohoDataGridEditCellFunctionArgs extends SohoDataGridPostRenderCellArgs {
  container: any;
  e: any;
  item: any;
}

type SohoDataGridExpandRowEventData = (

  /** Grid API */
  api: SohoDataGridStatic,

  /** Row id. */
  row: any,

  /** DOM Container nativeElement */
  detail: any,

  /** Column Definition. */
  columnDef: SohoDataGridColumn,

  /** Row data */
  item: Object

) => any;

type SohoDataGridExpandRowResponseFunction = (
  markup: string
) => void;

interface SohoDataGridExpandRowFunction  {
  eventData: SohoDataGridExpandRowEventData;
  response: SohoDataGridExpandRowResponseFunction;
}

/**
 * Type definition of the post render cell callback.
 */
type SohoDataGridPostRenderCellFunction = (
  container: JQuery, args: SohoDataGridPostRenderCellArgs
) => void;

type SohoDataGridEditCellFunction = (
  editor: any
) => void;

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

type SohoDataGridColumnFilterType = 'text' | 'checkbox' | 'contents' | 'date' | 'decimal' | 'integer' | 'percent' | 'select' | 'time';

interface SohoDataGridCellEditor {
  className: string;
  val(value?: any): any;
  focus(): void;
}

type SohoDataGridColumnEditorFunction = (
  row?: any,
  cell?: any,
  value?: any,
  container?: any,
  column?: SohoDataGridColumn,
  event?: any,
  grid?: any,
  item?: any
) => SohoDataGridCellEditor;

declare var Editors: {
  // Supports, Text, Numeric, Integer via mask
  Input: SohoDataGridColumnEditorFunction;
  Textarea: SohoDataGridColumnEditorFunction;
  Checkbox: SohoDataGridColumnEditorFunction;
  Dropdown: SohoDataGridColumnEditorFunction;
  Date: SohoDataGridColumnEditorFunction;
  Lookup: SohoDataGridColumnEditorFunction;
  Autocomplete: SohoDataGridColumnEditorFunction;
  Favorite: SohoDataGridColumnEditorFunction;
};

declare var Soho: {
  Formatters: {
    Text: SohoDataGridColumnFormatterFunction;
    Input: SohoDataGridColumnFormatterFunction;
    Placeholder: SohoDataGridColumnFormatterFunction;
    Ellipsis: SohoDataGridColumnFormatterFunction;
    Password: SohoDataGridColumnFormatterFunction;
    Readonly: SohoDataGridColumnFormatterFunction;
    Date: SohoDataGridColumnFormatterFunction;
    Time: SohoDataGridColumnFormatterFunction;
    Autocomplete: SohoDataGridColumnFormatterFunction;
    Lookup: SohoDataGridColumnFormatterFunction;
    Decimal: SohoDataGridColumnFormatterFunction;
    Integer: SohoDataGridColumnFormatterFunction;
    Hyperlink: SohoDataGridColumnFormatterFunction;
    Template: SohoDataGridColumnFormatterFunction;
    Drilldown: SohoDataGridColumnFormatterFunction;
    RowReorder: SohoDataGridColumnFormatterFunction;
    Checkbox: SohoDataGridColumnFormatterFunction;
    SelectionCheckbox: SohoDataGridColumnFormatterFunction;
    Actions: SohoDataGridColumnFormatterFunction;
    Textarea: SohoDataGridColumnFormatterFunction;
    Editor: SohoDataGridColumnFormatterFunction;
    Expander: SohoDataGridColumnFormatterFunction;
    GroupRow: SohoDataGridColumnFormatterFunction;
    GroupFooterRow: SohoDataGridColumnFormatterFunction;
    SummaryRow: SohoDataGridColumnFormatterFunction;
    Tree: SohoDataGridColumnFormatterFunction;
    ClassRange: SohoDataGridColumnFormatterFunction;
    Badge: SohoDataGridColumnFormatterFunction;
    Tag: SohoDataGridColumnFormatterFunction;
    Alert: SohoDataGridColumnFormatterFunction;
    Image: SohoDataGridColumnFormatterFunction;
    Color: SohoDataGridColumnFormatterFunction;
    Colorpicker: SohoDataGridColumnFormatterFunction;
    Button: SohoDataGridColumnFormatterFunction;
    Dropdown: SohoDataGridColumnFormatterFunction;
    Spinbox: SohoDataGridColumnFormatterFunction;
    Favorite: SohoDataGridColumnFormatterFunction;
    Status: SohoDataGridColumnFormatterFunction;
    TargetedAchievement: SohoDataGridColumnFormatterFunction;
  };

  Editors: {
    // Supports, Text, Numeric, Integer via mask
    Input: SohoDataGridColumnEditorFunction;
    Textarea: SohoDataGridColumnEditorFunction;
    Checkbox: SohoDataGridColumnEditorFunction;
    Dropdown: SohoDataGridColumnEditorFunction;
    Date: SohoDataGridColumnEditorFunction;
    Lookup: SohoDataGridColumnEditorFunction;
    Autocomplete: SohoDataGridColumnEditorFunction;
    Favorite: SohoDataGridColumnEditorFunction;
  };

  Locale: SohoLocaleStatic;
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
  Text: SohoDataGridColumnFormatterFunction;
  Input: SohoDataGridColumnFormatterFunction;
  Placeholder: SohoDataGridColumnFormatterFunction;
  Ellipsis: SohoDataGridColumnFormatterFunction;
  Password: SohoDataGridColumnFormatterFunction;
  Readonly: SohoDataGridColumnFormatterFunction;
  Date: SohoDataGridColumnFormatterFunction;
  Time: SohoDataGridColumnFormatterFunction;
  Autocomplete: SohoDataGridColumnFormatterFunction;
  Lookup: SohoDataGridColumnFormatterFunction;
  Decimal: SohoDataGridColumnFormatterFunction;
  Integer: SohoDataGridColumnFormatterFunction;
  Hyperlink: SohoDataGridColumnFormatterFunction;
  Template: SohoDataGridColumnFormatterFunction;
  Drilldown: SohoDataGridColumnFormatterFunction;
  RowReorder: SohoDataGridColumnFormatterFunction;
  Checkbox: SohoDataGridColumnFormatterFunction;
  SelectionCheckbox: SohoDataGridColumnFormatterFunction;
  Actions: SohoDataGridColumnFormatterFunction;
  Textarea: SohoDataGridColumnFormatterFunction;
  Editor: SohoDataGridColumnFormatterFunction;
  Expander: SohoDataGridColumnFormatterFunction;
  GroupRow: SohoDataGridColumnFormatterFunction;
  GroupFooterRow: SohoDataGridColumnFormatterFunction;
  SummaryRow: SohoDataGridColumnFormatterFunction;
  Tree: SohoDataGridColumnFormatterFunction;
  ClassRange: SohoDataGridColumnFormatterFunction;
  Badge: SohoDataGridColumnFormatterFunction;
  Tag: SohoDataGridColumnFormatterFunction;
  Alert: SohoDataGridColumnFormatterFunction;
  Image: SohoDataGridColumnFormatterFunction;
  Color: SohoDataGridColumnFormatterFunction;
  Colorpicker: SohoDataGridColumnFormatterFunction;
  Button: SohoDataGridColumnFormatterFunction;
  Dropdown: SohoDataGridColumnFormatterFunction;
  Spinbox: SohoDataGridColumnFormatterFunction;
  Favorite: SohoDataGridColumnFormatterFunction;
  Status: SohoDataGridColumnFormatterFunction;
  TargetedAchievement: SohoDataGridColumnFormatterFunction;
};

type SohoDataGridColumnHrefFunction = (
  row: any,
  cell: any,
  col: SohoDataGridColumn,
  value: any
) => string;

type SohoDataGridColumnHref = string | SohoDataGridColumnHrefFunction;

type SohoDataGridColumnIsEditableFunction = (
  row: number,
  cell: any,
  fieldValue: any,
  columnDef: SohoDataGridColumn,
  rowData: Object
) => boolean;

type SohoDataGridColumnColSpanFunction = (
  row: number,
  cell: any,
  fieldValue: any,
  columnDef: SohoDataGridColumn,
  rowData: Object,
  api: SohoDataGridStatic
) => number;

interface SohoDataGridColumnClickData {
  /** Index of the row clicked. */
  row: number;

  /** Element click. */
  cell: HTMLElement;

  /** Row data */
  item: any;

  /** Source event. */
  originalEvent: Event;
}

type SohoDataGridColumnClickFunction = (
  e: Event,
  args: SohoDataGridColumnClickData[]
) => void;

type SohoDataGridColumnContentVisibleFunction = (
  row: number,
  cell: HTMLElement,
  rowData: Object,
  columnDef: SohoDataGridColumn,
  item: any
) => boolean;

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
  width?: number | string;

  /** @todo fix type from any.  */
  align?: any;

  /** Tooltip for the column header. */
  headerTooltip?: string;

  /** Column formatter function or a string.  */
  formatter?: SohoDataGridColumnFormatterFunction | string;

  /** Icon to use. */
  icon?: string;

  /** Icon file to use. */
  iconFile?: string;

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

  /** Invoked when a clickable formatter is used, such as Button.  */
  click?: SohoDataGridColumnClickFunction;

  /** Is the grid searchable. */
  searchable?: boolean;

  /** Optional template to use when rendering cells using the Template formatter. */
  template?: string;

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

  /** Column function to dynamically set the readonly property on cells based on row data. */
  isEditable?: SohoDataGridColumnIsEditableFunction;

  /** Column function to dynamically set the colspan property on cells based on row data. */
  colspan?: SohoDataGridColumnColSpanFunction;

  /** special display formatting for a numeric column */
  numberFormat?: SohoDataGridColumnNumberFormat;

  /** false = prevent user drag/drop this column order i.e. a drilldown column */
  reorderable?: boolean;

  /** The older style pattern mask for the column */
  mask?: string;

  /** The newer style object pattern mask for the column*/
  maskOptions?: SohoMaskOptions;

  /** Call the grids `onPostRenderCell` function for cells in this column after they are rendered. */
  postRender?: boolean;

  /** Text to display? */
  text?: string;

  /** Angular component used to format a cell. */
  component?: any; //  // Type<{}>

  /** Inputs for the Angular component used to format a cell. */
  componentInputs?: any;

  /** Angular component used to edit a cell. */
  editorComponent?: any; // Type<{}>

  /** Inputs for the Angular component used to edit a cell. */
  editorComponentInputs?: any;

  /** If true the cell can be expanded on focus to show additional / all content. */
  expandOnActivate?: boolean;

  /** Sets the css text overflow on the cell. Specifically to add 'ellipsis' text */
  textOverflow?: string;

  /** Content visible function*/
  contentVisible?: SohoDataGridColumnContentVisibleFunction;

  /** If false the column will not be included in export */
  exportable?: boolean;

  /** Restrict row height to a single line for cells containing rich text */
  singleline?: boolean;

  /** Tooltip for the content of a column cell. */
  contentTooltip?: boolean;

  /**
   *  Option for tree datagrid
   *  If false children nodes will not be selected when the parent node is selected
   */
  selectChildren?: boolean;

  /** Enforce a max length when editing this column */
  maxLength?: boolean;
}

interface SohoDataGridColumnNumberFormat {
  decimal?: string;
  group?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  style?: SohoDataGridColumnNumberFormatStyle;
  round?: boolean;
}

type SohoDataGridColumnNumberFormatStyle = 'decimal' | 'currency' | 'percent' | 'integer' | string;
type SohoDataGridTriggerSourcePagerType = 'initial' | 'refresh' | 'filtered' | 'sorted' | 'updatecolums' | string;

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
  updateColumns(columns: SohoDataGridColumn[], columnGroups: SohoDataGridColumnGroup[]): void;

  /** Parse a JSON array with columns and return the column object. */
  columnsFromString(columns: string): Object;

  /** Restore user Settings */
  restoreUserSettings(settings: any): void;

  /** The grouping  name of the given column idx. */
  getColumnGroup(idx: number): string;

  /** Updates the pager associated with the grid. */
  updatePagingInfo(pagerInfo: SohoPagerPagingInfo): void;

  /** Updates the data displayed in the given row. */
  updateRow(idx: number, rowData: Object): void;

  /**
   * Hides the column at the given index.
   * @param {string} id The id of the column to show.
   */
  hideColumn(id: string): void;

  /**
   * Shows the column at the given index.
   * @param {string} id The id of the column to hide.
   */
  showColumn(id: string): void;

  /** Validate all rows and cells in the entire grid if they have validation on the column */
  validateAll(): void;

  /** Used to set the sort indicator on a column when disableClientSort is set to true */
  setSortIndicator(columnId: string, ascending: boolean): void;

  /** Use to change datagrid empty message */
  setEmptyMessage(emptyMessage: SohoEmptyMessageOptions): void;

  /**
   * Sets the column and direction to sort the dataset on.
   *
   * Can only be used once the grid has been initialised, otherwise
   * an error is thrown.
   *
   * @param columnId the id of the column to sort on.
   * @param ascending if true sort ascending, otherwise descending.  If not supplied the setting is toggled.
   */
  setSortColumn(columnId: string, ascending?: boolean);

  columnById(id: string): Array<any>;

  getColumnIndex(columnId: string): number;

  getHeaderRowColumn(fld: any): any;

  addRow(data: Object, location: any): void;

  removeRow(data: Object): void;

  removeSelected(): void;

  /** Toggles the display of the filter row. */
  toggleFilterRow(): void;

  /** Accept conditions from outside or pull from filter row */
  applyFilter(conditions?: Array<SohoDataGridFilterCondition>): void;

  /** Set the filter row from passed data / settings */
  setFilterConditions(conditions: Array<SohoDataGridFilterCondition>): void;

  /** Get filter conditions in array form from the UI */
  filterConditions(): Array<SohoDataGridFilterCondition>;

  /** Clear and reset the filter */
  clearFilter(): void;

  selectedRows(): SohoDataGridSelectedRow[];

  selectAllRows(): void;

  unSelectAllRows(): void;

  selectRow(idx: number): void;

  unselectRow(idx: number): void;

  selectRowsBetweenIndexes(range: number[]);

  selectedRows(): SohoDataGridSelectedRow[];

  selectRows(row: number | number[]);

  activateRow(idx: number): void;

  deactivateRow(): void;

  activatedRow(): SohoDataGridRowActivated;

  /**
  * Toggle the current selection state from on to off.
  * @param  {number} idx The row to select/unselect
  */
  toggleRowSelection(idx: number): void;

  setActiveCell(idx: number, idx2: number): void;

  /** Returns an array of row numbers for the rows containing the value for the specified field */
  findRowsByValue(fieldName: string, value: any): number[];

  renderHeader(): void;

  renderRows(): void;

  triggerSource(pagerType: SohoDataGridTriggerSourcePagerType, callback?: Function): void;

  exportToExcel(fileName: string, worksheetName: string, customDs: Object[]): void;

  exportToCsv(fileName: string, customDs: Object[]): void;

  /**
   * Returns an array of all the rows in the grid marked as dirty.
   *
   * @return an array of all the rows in the grid marked as dirty.
   */
  dirtyRows(): Array<any>;

  /**
   * Sets the status of a given row in the grid.
   *
   * @param idx - the row number (idx) of the row
   * @param status - status class name e.g. 'error'
   * @param tooltip - string value for tooltip message e.g. 'Error'
   */
  rowStatus(idx: number, status: string, tooltip: string): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

/**
 * Details of the 'sorted' event.
 */
interface SohoDataGridSortedEvent {
  // The id of the colummn
  sortId: string;

  // The associated field name
  sortField: string;

  // Ascending?
  sortAsc: boolean;
}

interface SohoDataGridRowActivated {
  row: number;
  item: any;
}

interface SohoDataGridSelectedRow {
  idx: number;
  data: any;
  elem: HTMLElement;

  /**
   * @deprecated <b>element</b> doesn't seem to be used in datagrid.js. Use <b>elem</b> instead.
   */
  element: HTMLElement;
}

interface SohoDataGridRowClicked {
  cell: number;
  item: any;
  originalEvent: JQuery.Event;
  row: number;
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

interface SohoDataGridRowReorderedEvent {
  start: any;
  startIndex: number;
  end: any;
  endIndex: number;
}

interface SohoDataGridAddRowEvent {
  row: any;
  cell: any;
  target: any;
  value: any;
  oldValue: any;
}
interface SohoDataGridOpenFilterRowEvent {
}

interface SohoDataGridCloseFilterRowEvent {
}

interface SohoDataGridSettingsChangedEvent {
  columns?: SohoDataGridColumn[];
  rowHeight?: SohoDataGridRowHeight;
  sortOrder?: { columnId: string, ascending?: boolean };
  pagesize?: number;
  activePage?: string;
  filter?: Array<SohoDataGridFilterCondition>;
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
 * Part of the grid options, indicates what specific grid settings to automatically save.
 */
interface SohoDataGridSaveUserSettings {
  columns?: boolean;
  rowHeight?: boolean;
  sortOrder?: boolean;
  pagesize?: boolean;
  activePage?: boolean;
  filter?: boolean;
}

interface SohoDataGridGroupable {

  //
  fields: string[];

  // Expanded boolean or a function to determine this.
  expanded?: boolean | Function;

  // Type of aggregation.
  aggregator: SohoDataGridAggregator;
}

type SohoDataGridAggregator = 'sum' | 'max' | 'list' | string;

/**
 * JQuery Integration
 */
interface JQueryStatic {
  datagrid: SohoDataGridStatic;
}

interface JQuery {
  datagrid(options?: SohoDataGridOptions): JQuery;
  on(events: 'cellchange' | 'activecellchange', handler: JQuery.EventHandlerBase<this, SohoDataGridCellChangeEvent>): this;
  on(events: 'rowremove', handler: JQuery.EventHandlerBase<this, SohoDataGridRowRemoveEvent>): this;
  on(events: 'settingschanged', handler: JQuery.EventHandlerBase<this, SohoDataGridSettingsChangedEvent>): this;
  on(events: 'rendered', handler: JQuery.EventHandlerBase<this, SohoDataGridRenderedEvent>): this;
  on(events: 'addrow', handler: JQuery.EventHandlerBase<this, SohoDataGridAddRowEvent>): this;
}

interface SohoDataGridRowExpandEvent {
  // child elements
  children?: Array<any>;

  // The index of the row number that has been expanded/collapsed.
  row?: number;

  // The detail row thas has been expanded..
  item?: any;

  // Data associated with row
  rowData?: any;
}

interface SohoDataGridRowCollapseEvent extends SohoDataGridRowExpandEvent { }

interface SohoDataGridRowActivatedEvent {
  row: number;
  item: any;
}

interface SohoDataGridRowDeactivatedEvent extends SohoDataGridRowActivatedEvent { }

interface SohoDataGridRenderedEvent {

}

interface SohoDataGridAfterRenderEvent {

}

interface SohoDataGridFilterCondition {
  columnId?: 'all' | string;
  format?: string;
  lowercase?: 'yes' | 'no';
  operator?: 'contains' | string;
  value?: string;
}

interface SohoDataGridColumnGroup {
  colspan: number;
  id: string;
  name: string;
}
