/**
 * Defines the data source of the datagrid.
 */
export const DATAGRID_TYPES = {
  // Determines the type to use based on the presence of a service.
  AUTO: 'auto',

  // Use the components content.
  CONTENT_ONLY: 'content-only'
};

// Valid list of data grid types.
export const DATAGRID_TYPE_LIST = [DATAGRID_TYPES.AUTO, DATAGRID_TYPES.CONTENT_ONLY];

/**
 * Row height.
 */
export type RowHeightType = 'normal' | 'medium' | 'small';

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

export interface GridColumn {
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

export class GridOptions {
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
  columns: Array<GridColumn> = Array<GridColumn>();

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
  rowHeight: RowHeightType = 'small';
  // false; 'single' or 'multiple'
  selectable: boolean | 'single' | 'multiple' = false;
  clickToSelect = true;
  toolbar: boolean | ToolbarOptions =  new ToolbarOptions();
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
}

export class ToolbarOptions {
    title: string = 'SoHo Data Grid';
    results: boolean = true;
    keywordFilter: boolean = true;
    filter: boolean = true;
    rowHeight: boolean = true;
    views: boolean = true;
    collapsibleFilter: boolean = true;
    dateFilter: boolean = true;
    actions: any = [];
    personalize: boolean = true;
    advancedFilter: boolean = true;
}

export interface DataGridSelectedEvent {
}

export interface DataGridCellChangeEvent {
    row: any;
    cell: any;
    target: any;
    value: any;
    oldValue: any;
    column: any;
}

export interface GridRequest {
}

export interface PageInfo {
  pagesize: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}
