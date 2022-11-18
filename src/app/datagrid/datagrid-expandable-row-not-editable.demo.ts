import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data-edit2';

@Component({
  template: `
      <input #descText soho-input name="description" id="description" value="{{id}}" />
  `,
})
export class ExpandedDemoComponent implements OnDestroy {
  data?: any[];
  id?: string;
  constructor(@Inject('args') public args: any) {
    if (args && args.data) {
      this.data = args.data;
    }

    if (args && args.item) {
      this.id = args.item.id;
    }
  }

  @Output() valueChange = new EventEmitter();

  ngOnDestroy() { }
}


@Component({
  selector: 'app-datagrid-expandable-row-not-editable-demo',
  templateUrl: 'datagrid-expandable-row-not-editable.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridExpandableRowNotEditableDemoComponent implements AfterViewChecked, OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent?: SohoDataGridComponent;

  constructor() { }

  gridOptions?: SohoDataGridOptions = undefined;
  ngOnInit() {
    this.gridOptions = this.buildGridOptions();
  }

  ngAfterViewChecked() { }

  private buildGridOptions(): SohoDataGridOptions {
    // Replace the first two column with an expander
    PAGING_COLUMNS[0] = {
      id: 'expander',
      field: 'productId',
      formatter: Soho.Formatters.Expander,
      filterType: 'text',
      width: '15%',
      editor: Soho.Editors.Input,
    };

    return {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      clickToSelect: true,
      selectable: 'mixed',
      rowHeight: 'extra-small',
      disableRowDeactivation: false,
      columnSizing: 'header',
      emptyMessage: null,
      editable: true,
      rowTemplateComponent: ExpandedDemoComponent,
      rowTemplateField: 'detail',
      rowTemplateComponentInputs: undefined,
      rowTemplate: `
          <div class="datagrid-cell-layout">
          </div>
          `,
    } as SohoDataGridOptions;
  }

  isEditable(
    row: number,
    cell: any,
    fieldValue: any,
    columnDef: SohoDataGridColumn,
    rowData: any
  ): boolean {
    return true;
  }
}
