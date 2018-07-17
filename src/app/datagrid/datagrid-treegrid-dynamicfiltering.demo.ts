import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent, SohoDataGridToggleRowEvent } from 'ids-enterprise-ng';
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DatagridTreegridServiceDemo } from './datagrid-treegrid-service.demo';

@Component({
  selector: 'soho-datagrid-treegrid-dynamicfiltering',
  templateUrl: 'datagrid-treegrid-dynamicfiltering.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ DatagridTreegridServiceDemo ]
})

export class DatagridTreegridDynamicfilteringDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  public data: any[];

  constructor(
    private treeService: DatagridTreegridServiceDemo,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data = this.data = this.treeService.getSimpleData();
  }

  public get columns(): SohoDataGridColumn[] {
    return this.treeService.getSimpleColumns();
  }

  toggleFilterRow() {
    this.dataGrid.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid.clearFilter();
  }

  /**
   * restore original data for demo purposes
   */
  onReset() {
    this.data = this.data = this.treeService.getSimpleData();
  }

  onFiltered(e: SohoDataGridOpenFilteredEvent) {
    if (e.conditions[0] !== undefined) {
      // Emulate server side filtering
      // Reset data and replacing with new (mock) data from a server
      const dataCopy: any[] = Array.from(this.data);

      // Clear out old data
      this.data = [];

      // Get new data that matches filter criteria
      this.data = [].concat(dataCopy.find((d) => {
        return d.alpha.toLowerCase() === e.conditions[0].value;
      }));

      // Force change detection so the template rebuilds with the new data
      this.changeDetectorRef.markForCheck();
    }
  }
}
