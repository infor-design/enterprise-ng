import {
  Component,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoDataGridComponent,
  SohoDataGridService
} from 'ids-enterprise-ng';

import { DataGridDemoService } from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-groupable-demo',
  templateUrl: './datagrid-groupable.demo.html',
  providers: [ { provide: SohoDataGridService, useClass: DataGridDemoService } ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridGroupableDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

  private _groupColumn: string;

  public set groupColumn(value: string) {
    this._groupColumn = value;
    if (this.dataGrid) {
      this.dataGrid.groupable = {fields: [this._groupColumn], aggregator: 'sum'};
    }
  }
  public get groupColumn(): string {
    return this._groupColumn;
  }

  public groups: any[] = [];

  constructor(private service: SohoDataGridService) {
    service.getColumns().forEach(element => {
      if (element.field && element.hidden !== true) {
        this.groups.push({value: element.field, text: element.name});
      }
    });

    this._groupColumn = this.groups[0].value;
  }

  ngAfterViewInit() {
    this.dataGrid.groupable = {fields: [this.groupColumn], aggregator: 'sum'};
  }

}
