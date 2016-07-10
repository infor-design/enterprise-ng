// Copyright (c) 2016 Infor. All rights reserved. www.infor.com
// 
// NOTICE 
// 
// THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS
// CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES
// OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR
// WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND
// ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH
// THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.
// ALL OTHER RIGHTS RESERVED.
//
// (c) COPYRIGHT 2016 INFOR.  ALL RIGHTS RESERVED.
// THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE
// TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR
// AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS
// RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE
// THE PROPERTY OF THEIR RESPECTIVE OWNERS. 

//
// Author: Theo Harper (theo.harper@infor.com)
//

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
};

export interface GridColumn {
  // Identifier for the grid columns
  id: string;
  // Localised name for the columns
  name: string;
  // Json field
  field: string;
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
}

export class GridOptions {
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
  dataset: any[] = [];
  // Allow Column reorder
  columnReorder = false;
  // Save Column Reorder and resize
  saveColumns = true;
  editable = false;
  // Makes a readonly "list"
  isList = false;
  // Id to the right click context menu
  menuId: any = null;
  // (short, medium or normal)
  rowHeight: 'normal' | 'medium' | 'small' = 'small';
  // false; 'single' or 'multiple'
  selectable: boolean = true;
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
