import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  Injector,
  ApplicationRef,
  NgModule,
  Compiler,
  OnDestroy,
  Input,
  Inject
} from '@angular/core';
import {
  SohoDataGridComponent,
  SohoButtonComponent,
  SohoComponentsModule
} from 'ids-enterprise-ng';
import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';
import { SohoIconUtils } from '../../soho/utils/soho-icon.utils';

export const LMFavorite = (row, cell, value, col, rowData, api): string => {
  const isChecked: boolean = (rowData && rowData.price > 200); // jshint ignore:line
  const icon = isChecked ? 'star-filled' : 'star-outlined';
  return '<span class="audible">' + Soho.Locale.translate('Favorite') +
    '</span><span class="icon-favorite">' + SohoIconUtils.createIcon({ icon: icon }) + '</span>';
};

@Component({
  template: '<button soho-button="icon" icon="settings" (click)="onClick($event)" title="{{args?.row}} . {{args.cell}}"></button>'
})
export class DemoCellFormatterComponent implements OnDestroy {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    console.log(`constructor ${this.args.value}`);
  }
  public onClick(e) {
    console.log(`${this.args.row}`);
  }

  ngOnDestroy() {
    console.log(`DemoCellFormatterComponent ${this.args.row} destroyed`);
  }
}

@Component({
  template: '{{args?.value?.price}}'
})
export class DemoCellIntegerFormatterComponent {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {}
}

@Component({
  selector: 'soho-datagrid-custom-formatter-demo',
  templateUrl: './datagrid-custom-formatter.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  entryComponents: [SohoButtonComponent],
})
export class DataGridCustomFormatterDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  constructor() {
  }
  visible: boolean;

  onClick(args) {
    console.log('click');
  }

  isContentVisible(row: number, cell: HTMLElement, data: Object, col: SohoDataGridColumn, item: any): boolean {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
    return this.visible;
  }

  ngAfterViewInit(): void {
    /**
     * Add a column for the custom formatter
     */
    const columns: SohoDataGridColumn[] = [];
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
      name: 'Edit',
      text: 'Edit Row',
      sortable: false,
      icon: 'edit',
      align: 'center',
      formatter: Soho.Formatters.Button,
      click: (e, args) => this.onClick(args)
    });
    columns.push({
      id: 'buton-formatter',
      name: 'Button',
      text: 'Visible button',
      sortable: false,
      align: 'center',
      formatter: Soho.Formatters.Button,
      click: (e, args) => this.onClick(args),
      contentVisible: (row, cell, data, col, item) => this.isContentVisible(row, cell, data, col, item)
    });
    const gridOptions: SohoDataGridOptions = {
      columns: columns,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
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
  return Soho.Formatters.Integer(row, cell, value, column, item, api);
}
