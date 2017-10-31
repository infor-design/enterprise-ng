import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef
} from '@angular/core';
import {
  SohoDataGridComponent,
  SohoButtonComponent
} from '@infor/sohoxi-angular';
import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';
import { SohoIconUtils } from '../../soho/utils/soho-icon.utils';

export const LMFavorite = (row, cell, value, col, rowData, api): string => {
  const isChecked: boolean = (rowData && rowData.price > 200); // jshint ignore:line
  const icon = isChecked ? 'star-filled' : 'star-outlined';
  return '<span class="audible">' + Locale.translate('Favorite') +
    '</span><span class="icon-favorite">' + SohoIconUtils.createIcon({ icon: icon }) + '</span>';
};

@Component({
  selector: 'soho-datagrid-custom-formatter-demo',
  templateUrl: './datagrid-custom-formatter.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  entryComponents: [SohoButtonComponent],
})
export class DataGridCustomFormatterDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              private app: ApplicationRef) {
  }

  onClick(args) {
    console.log('click');
  }

  /**
  * Emulating the need to inject a component in the cell
  */
  onPostRender = (
    container: any,
    args: Object
  ) => {

    const factory = this.resolver.resolveComponentFactory(SohoButtonComponent);
    const ref = factory.create(this.injector, [], container);
    this.app.attachView(ref.hostView);
  }

  ngAfterViewInit(): void {
    /**
     * Add a column for the custom formatter
     */
    const columns = [];
    PAGING_COLUMNS.forEach(element => columns.push(element));
    columns.push({
      id: 'custom-formatter',
      name: 'Custom Formatter',
      field: '',
      formatter: MyCustomFormatter,
    });
    columns.push({
      id: 'favorite-formatter',
      name: 'Favorite',
      field: '',
      align: 'center',
      sortable: false,
      formatter: LMFavorite,  // We could use the built in Favorite formatter also.
    });
    columns.push({
      id: 'button-formatter',
      name: 'Button',
      text: 'Press Me!',
      sortable: false,
      align: 'center',
      formatter: Formatters.Button,
      click: (e, args) => this.onClick(args)
    });
    columns.push({
      id: 'postrender',
      name: 'Post Rendered',
      sortable: false,
      align: 'center',
      postRender: this.onPostRender
    });
    const gridOptions: SohoDataGridOptions = <SohoDataGridOptions>{
      columns: columns,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
      postColumnRender: true, // Needed for the Post Rendered column
      /**
       * Set userObject to the instance of this DemoComponent.
       * In that way the CustomFormatter can gain access to it.
       */
      userObject: this
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }

  /**
   * Make a public method so it's available for the custom formatter
   * through the userObject reference to this DemoComponent
   */
  public getRandomNumber(): number {
    const min = 1;
    const max = 50;
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
