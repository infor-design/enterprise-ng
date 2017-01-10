import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import {
  SohoDataGridComponent,
} from '@infor/sohoxi-angular';
import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';

@Component({
  selector: 'soho-datagrid-custom-formatter-demo',
  templateUrl:'./datagrid-custom-formatter.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridCustomFormatterDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  ngAfterViewInit(): void {
    /**
     * Add a
     */
    PAGING_COLUMNS.push({
      id: 'custom-formatter',
      name: 'Custom Formatter',
      field: '',
      formatter: MyCustomFormatter,
    });

    let gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,

      /**
       * Set userObject to the instance of this DemoComponent.
       * In that way the CustomFormatter can gain access to it.
       */
      userObject: this,
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }

  /**
   * Make a public method so it's available for the custom formatter
   * through the userObject reference to this DemoComponent
   */
  public getRandomNumber(): number {
    let min = 1;
    let max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

/**
 * Emulating the need to access an object instance outside of a Formatter
 */
function MyCustomFormatter(
  row: number,
  cell: any,
  value: any,
  column: SohoDataGridColumn,
  item: Object,
  api: SohoDataGridStatic
): any {
  // call back into the DemoComponent to get some information
  value = api.settings.userObject.getRandomNumber();

  // use a standard formatter to format that value.
  return Formatters.Integer(row, cell, value, column, item, api);
}
