import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { Constants } from './datagrid-lookup-cell-change-constants';

const fieldFn = (row: any, _field: any, _grid: any) => row.country;
const matchFn = (value: any, row: any, _field: any, _grid: any) =>
  row.country === value;

@Component({
  selector: 'app-datagrid-lookup-cell-change-demo',
  templateUrl: 'datagrid-lookup-cell-change.demo.html',
  providers: []
})

export class DataGridLookupCellChangeDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent?: SohoDataGridComponent;
  gridOptions?: SohoDataGridOptions = undefined;

  columns: any[] = [];
  pagingData: any = [];
  printPagingData: any = [];
  countryLookupData: any = [];
  countryData: any = [];
  findCountryLookupData: any = {};
  messageObj: any;

  isAlreadyValidated?: boolean = false;

  lookupColumns = [
    {
      id: 'code',
      name: 'Code',
      field: 'code',
    },
    {
      id: 'description',
      name: 'Description',
      field: 'description',
    },
  ];
  readonly localeDateFormat = Soho.Locale.calendar().dateFormat.short;

  constructor() { }

  ngOnInit() {
    this.countryData = Constants.countryData;
    for (const optionsData of this.countryData) {
      const optionsObj = {
        country: optionsData.id,
        code: optionsData?.code,
        description: optionsData?.description,
      };
      this.countryLookupData.push(optionsObj);
    }

    const STATUS_LOOKUP_OPTIONS = {
      field: fieldFn,
      match: matchFn,
      options: {
        field: 'country',
        columns: this.lookupColumns,
        dataset: this.countryLookupData,
        selectable: 'single',
        toolbar: {
          title: 'Country',
          results: true,
          keywordFilter: true,
          advancedFilter: false,
          actions: true,
          views: true,
          rowHeight: true,
          personalize: true,
        },
      },
    };

    const fiscalIdOptions = [
      { id: 'Yes', value: 'yes', label: Soho.Locale.translate('Yes') },
      { id: 'No', value: 'no', label: Soho.Locale.translate('No') },
    ];

    this.columns = [
      {
        id: 'Country',
        name: 'Country',
        field: 'country',
        sortable: true,
        formatter: Soho.Formatters.Lookup,
        editor: Soho.Editors.Lookup,
        editorOptions: STATUS_LOOKUP_OPTIONS,
        validate: 'lookupFieldValidation',
        required: true,
      },
      {
        id: 'FiscalID',
        name: 'Fiscal Id',
        field: 'fiscalID',
        editor: Soho.Editors.Dropdown,
        sortable: true,
        formatter: Soho.Formatters.Dropdown,
        options: fiscalIdOptions,
      },
      {
        id: 'IdentificationNumber',
        name: 'Identification number',
        field: 'identificationNumber',
        sortable: true,
        formatter: Soho.Formatters.Input,
        editor: Soho.Editors.Input,
        required: true,
      },
    ];

    this.gridOptions = {
      dataset: this.pagingData,
      columns: this.columns,
      clickToSelect: false,
      selectable: 'single',
      showNewRowIndicator: false,
      editable: true,
      enableTooltips: true,
      showDirty: true
    };
  }

  isDisabled(
    row: number,
    cell: any,
    fieldValue: any,
    columnDef: SohoDataGridColumn,
    rowData: any
  ) {
    if (rowData && rowData.country) {
      return true;
    } else {
      return false;
    }
  }

  onClickOnAdd() {
    let newRowObj = {
      country: '',
      fiscalID: 'no',
      identificationNumber: '',
    };
    this.sohoDataGridComponent?.addRow(newRowObj, 'bottom');
    if (
      this.pagingData &&
      this.pagingData.length &&
      this.sohoDataGridComponent?.dataset &&
      this.sohoDataGridComponent.dataset[this.pagingData.length - 1].rowStatus
    ) {
      delete this.sohoDataGridComponent.dataset[this.pagingData.length - 1]
        .rowStatus;
    }
  }

  onCellChange(event: any) {
    if (event) {
      if (event.column.id === 'Country') {
        event.rowData.country = event.rowData.country.trim();
        const selectedCountry = event.rowData[event.column.field];
      }
      this.pagingData[event.row] = event.rowData;
      this.sohoDataGridComponent?.updateRow(event.row, event.rowData);
    }
  }
}
