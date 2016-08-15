/**
 * List of valid formatters.
 */
export declare var Formatters: {
  Text: any;
  Readonly: any;
  Date: any;
  Autocomplete: any;
  Lookup: any;
  Decimal: any;
  Integer: any;
  Hyperlink: any;
  Template: any;
  Drilldown: any;
  Password: any;
  TextArea: any;
  Checkbox: any;
  SelectionCheckbox: any;
  Actions: any;
  Textarea: any;
  Expander: any;
  ClassRange: any;
  Badge: any;
  Tag: any;
  Alert: any;
  Image: any;
  Color: any;
  Button: any;
  Dropdown: any;
  Favorite: any;
  Status: any;
};

export declare var Editors: {
  // @todo
};

export interface SohoGridColumn {
  // Identifier for the grid columns
  id: string;
  // Localised name for the columns
  name?: string;
  // Json field
  field?: string;
  // Showing?
  hidden?: boolean;
  // Sortable?
  sortable?: boolean;
  // How wide?
  width?: any;
  align?: any;
  // How to format the column.
  formatter?: any;
  icon?: string;
  editor?: any;
  filterType?: any;
  filterFormatter?: any;
  cssClass?: any;
  dateShowFormat?: any;
  dateSourceFormat?: any;
  click?: any;
  searchable?: boolean;
  inputType?: any;
  dateFormat?: string;
  ranges?: any;
  menuId?: any;
  selected?: any;
  resizable?: boolean;
}

export interface SohoDatagridConfiguration {
  /**
   * F2 - toggles actionableMode "true" and "false"
   * If actionableMode is "true”, tab and shift tab behave like left and right arrow key,
   * if the cell is editable it goes in and out of edit mode
   */
  actionableMode?: boolean;
  /**
   * If cellNavigation is "false”, will show border arround whole row on focus
   */
  cellNavigation?: boolean;
  /**
   * Sets shading for readonly grids
   */
  alternateRowShading?: boolean;
  columns?: SohoGridColumn[];
  data?: Object[];
  dataset?: Object[];
  /**
   * Allow column reorder
   */
  columnReorder?: boolean;
  /**
   * Save Column Reorder and resize
   */
  saveColumns?: boolean;
  editable?: boolean;
  /**
   * Makes a readonly "list"
   */
  isList?: boolean;
  /**
   * Id to the right click context menu
   */
  menuId?: string;
  /**
   * Determines the row height. Exists as:
   *  - short
   *  - medium
   *  - normal
   */
  rowHeight?: 'short' | 'medium' | 'normal';
  /**
   * Sets the select-ability for the datagrid
   */
  selectable?: boolean | 'single' | 'multiple';
  clickToSelect?: boolean;
  /**
   * or features fx..
   * {
   *    title: 'Data Grid Header Title',
   *    results: true,
   *    keywordFilter: true,
   *    filter: true,
   *    rowHeight: true,
   *    views: true
   * }
   */
  toolbar?: boolean | Object;
  /**
   * Paging Options
   */
  paging?: boolean;
  pagesize?: number;
  pagesizes?: number[];
  /**
   * Removed ability to go to a specific page.
   */
  indeterminate?: boolean;
  /**
   * Callback for paging
   */
  source?: Function;
  /**
   * Filtering Options
   */
  filterable?: boolean;
}

export class SohoGridOptions {
  // Which column property is the rows identifier?
  idProperty: string;
  // F2 - toggles actionableMode "true" and "false"
  // If actionableMode is "true”; tab and shift tab behave like left and right arrow key,
  // if the cell is editable it goes in and out of edit mode
  actionableMode = false;
  // If cellNavigation is "false”, will show border arround whole row on focus
  cellNavigation = true;
  // Sets shading for readonly grids
  alternateRowShading = true;
  //
  columns = Array<SohoGridColumn>();

  // Initial dataset
  dataset: any[] = [];
  // Allow Column reorder
  columnReorder = false;
  // Save Column Reorder and resize
  saveColumns = true;

  // Editable?
  editable = false;
  // Makes a readonly "list"
  isList = false;
  // Id to the right click context menu
  menuId: any = null;
  // (short, medium or normal)
  rowHeight: 'normal' | 'medium' | 'short' = 'short';
  // false; 'single' or 'multiple'
  selectable: boolean | 'single' | 'multiple' = false;
  clickToSelect = true;
  toolbar: boolean | SohoToolbarConfiguration = new SohoToolbarOptions();
  // Paging Options
  paging = false;
  // Page size
  pagesize = 25;
  // pages sizes (!!)
  pagesizes: Array<number> = [10, 25, 50, 75];
  // removed ability to go to a specific page.
  indeterminate = false;
  // callback for paging
  source: any = null;

  constructor(options?: SohoDatagridConfiguration) {
    Object.assign(this, options);
  }
}

export interface SohoToolbarConfiguration {
  actions?: any | any[];
  advancedFilter?: boolean;
  collapsibleFilter?: boolean;
  dateFilter?: boolean;
  filter?: boolean;
  keywordFilter?: boolean;
  personalize?: boolean;
  results?: boolean;
  rowHeight?: boolean;
  title?: string;
  views?: boolean;
}

export class SohoToolbarOptions implements SohoToolbarConfiguration {
  title = 'SoHo Data Grid';
  results = true;
  keywordFilter = true;
  filter = true;
  rowHeight = true;
  views = true;
  collapsibleFilter = true;
  dateFilter = true;
  actions: any = [];
  personalize = true;
  advancedFilter = true;
}

export interface SohoDataGridSelectedEvent {
}

export interface SohoDataGridCellChangeEvent {
  row: any;
  cell: any;
  target: any;
  value: any;
  oldValue: any;
  column: any;
}

export interface PageInfo {
  pagesize: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface SohoSourceRequest {
  activePage: number;
  pagesize: number;
  type: string;
  total: number;
  filterExpr: {
    column: 'all' | string;
    lowercase: 'yes' | 'no';
    operator: 'contains' | string;
    value: string;
  }[];
  preserveSelected?: boolean;
  sortAsc?: boolean;
  sortField?: string;
  sortId?: string;
}

export type SohoResponseFunction = (
  results: Object[],
  request: SohoSourceRequest
) => {};

export type SohoSourceFunction = (
  request: SohoSourceRequest,
  response: SohoResponseFunction
) => {};

export declare abstract class SohoDatagridSource {
  abstract source(req: SohoSourceRequest, response: (results: Object[], request: SohoSourceRequest) => {}): void;
}
