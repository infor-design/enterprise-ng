import {
  Component,
  ViewChild,
  Inject,
  OnInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { SohoInputComponent, SohoDatePickerComponent } from 'ids-enterprise-ng';

function FIELD_FN(row: any, _field: any, _grid: any) {
  return row.status;
}

function MATCH_FN(value: any, row: any, _field: any, _grid: any) {
  return (row.status === value);
}

@Component({
  template: `<input #input alignRight="true" [(ngModel)]="value" soho-input
        soho-mask [process]="'number'" [integerLimit]="3" (write)="onMaskWrite($event)"/>`
})
export class DemoCellInputEditorComponent implements SohoDataGridCellEditor {
  @ViewChild(SohoInputComponent, { static: true }) input?: SohoInputComponent;

  value: string;
  className?: string;

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.value = args.value;
  }

  onMaskWrite(event: any) {
    console.log(`DemoCellInputEditorComponent ${this.args.row} onMaskWrite: ${event}`);
  }

  // @region Soho Editor Implementation

  val(value?: any) {
    if (value) {
      this.value = value;
    }
    return this.value;
  }

  focus() {
    this.input?.focus();
  }
}

/**
 * DataPicker Angular Edit Component
 *
 * This component display a date picker in a cell when editted.
 */
@Component({
  template: `<input soho-datepicker dateFormat="MM/dd/yyyy" mode="standard" placeholder="MM/dd/yyyy"/>`
})
export class DemoCellDatePickerEditorComponent implements SohoDataGridCellEditor {
  @ViewChild(SohoDatePickerComponent, { static: true }) datePicker?: SohoDatePickerComponent;

  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
  }

  className?: 'datepicker';

  val(value?: any) {
    if (value) {
      this.datePicker?.setValue(value, true, false);
    }
    return this.datePicker?.getValue();
  }

  focus() {
    this.datePicker?.focus();
  }
}

@Component({
  selector: 'soho-datagrid-angular-editor',
  templateUrl: 'datagrid-angular-editor.demo.html'
})
export class DataGridAngularEditorDemoComponent implements OnInit {
  gridOptions?: any;

  public locales = [
    { value: 'en-US', label: 'English (American)' },
    { value: 'ar-SA', label: 'Arabic (Saudi Arabia)' }
  ];

  LOOKUP_DATA: any[] = [
    { status: 'Late', description: 'Item is late' },
    { status: 'Active', description: 'Active' },
    { status: 'Inactive', description: 'Inactive' },
    { status: 'On Hold', description: 'Item is currently on hold' },
    { status: '', description: 'Unknown' }
  ];

  LOOKUP_COLUMNS = [
    {
      id: 'selectionCheckbox',
      sortable: false,
      resizable: false,
      formatter: Soho.Formatters.SelectionCheckbox,
      align: 'center',
    },
    {
      id: 'status',
      name: 'Permission Value',
      field: 'status',
      formatter: Soho.Formatters.Text,
      sortable: false,
    },
  ];

  STATUS_LOOKUP_OPTIONS = {
    field: FIELD_FN,
    match: MATCH_FN,
    options: {
      field: 'status',
      columns: this.LOOKUP_COLUMNS,
      // dataset: this.LOOKUP_DATA,
      source: this.sourcePermissionValues.bind(this),
      paging: true,
      pagesize: Number(10),
      pagesizes: [10, 25, 50, 75, 100],
      selectable: 'multiple',
      toolbar: { title: 'Business Party', results: true, dateFilter: false, keywordFilter: false, advancedFilter: true, actions: true, views: true, rowHeight: true }
    }
  };

  EDITORS_DATA: any[] = [
    {
      id: 0,
      productId: 214220,
      productName: 'Compressor 1',
      activity: 'Assemble Paint',
      quantity: 1,
      price: 210.99,
      orderDate: '2015-01-01T06:00:00.000Z',
      action: 'Action',
      favorite: true
    },
    {
      id: 1,
      productId: 214221,
      productName: 'Compressor 2',
      activity: 'Assemble Paint',
      quantity: 1.5,
      price: 209.99,
      status: 'Late',
      orderDate: '2015-01-02T06:00:00.000Z',
      action: 'Action',
      favorite: false
    },
    {
      id: 2,
      productId: 214222,
      productName: 'Compressor 3',
      activity: 'Assemble Paint',
      quantity: 2,
      price: 208.99,
      status: 'Active',
      orderDate: '2015-01-03T06:00:00.000Z',
      action: 'Action',
      favorite: true
    },
    {
      id: 3,
      productId: 214223,
      productName: 'Compressor 4',
      activity: 'Assemble Paint',
      quantity: 2.5,
      price: 207.99,
      status: 'Inactive',
      orderDate: '2015-01-04T06:00:00.000Z',
      action: 'Action',
      favorite: true
    },
    {
      id: 4,
      productId: 214224,
      productName: 'Compressor 5',
      activity: 'Assemble Paint',
      quantity: 3,
      price: 206.99,
      status: 'Inactive',
      orderDate: '2015-01-05T06:00:00.000Z',
      action: 'Action',
      favorite: false
    },
    {
      id: 5,
      productId: 214225,
      productName: 'Compressor 6',
      activity: 'Assemble Paint',
      quantity: 3.5,
      price: 205.99,
      status: 'Inactive',
      orderDate: '2015-01-06T06:00:00.000Z',
      action: 'Action',
      favorite: false
    },
    {
      id: 6,
      productId: 214226,
      productName: 'Compressor 7',
      activity: 'Assemble Paint',
      quantity: 4,
      price: 204.99,
      status: 'On Hold',
      orderDate: '2015-01-07T06:00:00.000Z',
      action: 'Action',
      favorite: true
    },
    {
      id: 7,
      productId: 214227,
      productName: 'Compressor 8',
      activity: 'Assemble Paint',
      quantity: 4.5,
      price: 203.99,
      status: 'On Hold',
      orderDate: '2015-01-08T06:00:00.000Z',
      action: 'Action',
      favorite: true
    },
    {
      id: 8,
      productId: 214228,
      productName: 'Compressor 9',
      activity: 'Assemble Paint',
      quantity: 5,
      price: 202.99,
      status: 'On Hold',
      orderDate: '2015-01-09T06:00:00.000Z',
      action: 'Action',
      favorite: false
    },
    {
      id: 9,
      productId: 214229,
      productName: 'Compressor 10',
      activity: 'Assemble Paint',
      quantity: 5.5,
      price: 201.99,
      status: 'On Hold',
      orderDate: '2015-01-10T06:00:00.000Z',
      action: 'Action',
      favorite: false
    }
  ];

  EDITORS_COLUMNS: SohoDataGridColumn[] = [
    {
      id: 'productId',
      name: 'Product Id',
      field: 'productId',
      sortable: false,
      filterType: 'integer',
      formatter: Soho.Formatters.Readonly
    },

    {
      id: 'status',
      name: 'Status',
      field: 'status',
      sortable: false,
      filterType: 'text',
      formatter: Soho.Formatters.Lookup,
      editor: Soho.Editors.Lookup,
      editorOptions: this.STATUS_LOOKUP_OPTIONS
    },

    {
      id: 'quantity',
      name: 'Quantity',
      field: 'quantity',
      sortable: false,
      filterType: 'number',
      editorComponent: DemoCellInputEditorComponent,
      editorComponentInputs: {}
    },
    {
      id: 'orderDate',
      name: 'Order Date',
      field: 'orderDate',
      sortable: false,
      formatter: Soho.Formatters.Date,
      dateFormat: 'M/d/yyyy',
      editorComponent: DemoCellDatePickerEditorComponent,
      editorComponentInputs: {}
    }
  ];

  constructor(
    private ref: ChangeDetectorRef,
    private ngZone: NgZone) { }

  sourcePermissionValues(
    req: SohoDataGridSourceRequest,
    response: SohoDataGridResponseFunction
  ) {
    const permissionValues = [];
    req.total = 16;
    response(this.LOOKUP_DATA, req);
  }

  ngOnInit() {
    this.gridOptions = {
      columns: this.EDITORS_COLUMNS,
      dataset: this.EDITORS_DATA,
      selectable: 'single',
      idProperty: 'productId',
      stretchColumn: 'last',
      editable: true,
      isList: true,
      filterable: true
    };
  }

  onChange(e: SohoDropDownEvent) {
    const value = e.data;
    Soho.Locale.set(value).done(
      () => {
        this.ngZone.run(
          () => {
            this.ref.markForCheck();
          }
        );
      });
  }
}
