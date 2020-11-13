import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoBusyIndicatorDirective } from 'ids-enterprise-ng';
import { DatagridTreegridServiceDemo } from './datagrid-treegrid-service.demo';

@Component({
  selector: 'app-datagrid-treegrid-dynamicfiltering',
  templateUrl: 'datagrid-treegrid-dynamicfiltering.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ DatagridTreegridServiceDemo ]
})

export class DatagridTreegridDynamicfilteringDemoComponent implements OnInit, AfterViewInit {
  public data: any = [];
  public gridOptions?: SohoDataGridOptions;

  @ViewChild(SohoDataGridComponent) dataGrid?: SohoDataGridComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator?: SohoBusyIndicatorDirective;

  constructor(
    private treeService: DatagridTreegridServiceDemo,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.gridOptions = {
      filterWhenTyping: false,
      disableClientSort: true,
      disableClientFilter: true,
      columns: this.columns
    };
  }

  ngAfterViewInit() {
    setTimeout(() => this.build());
  }

  toggleFilterRow() {
    this.dataGrid?.toggleFilterRow();
  }

  clearFilter() {
    this.dataGrid?.clearFilter();
  }

  /**
   * restore original data for demo purposes
   */
  onReset() {
    this.data = this.data = this.treeService.getSimpleData();
  }

  onFiltered(e: SohoDataGridFilteredEvent) {
    if (e.conditions[0] !== undefined) {
      // Emulate server side filtering
      // Reset data and replacing with new (mock) data from a server
      const dataCopy: any[] = this.treeService.getSimpleData();

      // Clear out old data
      this.data = [];

      // Hard coding check for child records for demo
      if (e.conditions[0].value === 'c1') {
        this.data.push(dataCopy[2].children[0]);
      } else if (e.conditions[0].value === 'c2') {
        this.data.push(dataCopy[2].children[1]);
      } else {
        // Get new data that matches filter criteria
        this.data = [].concat(dataCopy.find((d) => {
          return d.alpha.toLowerCase() === e.conditions[0].value;
        }));
      }

      // Set change detection so the template rebuilds with the new data
      this.changeDetectorRef.markForCheck();
    } else {
      // If no conditions reload original data
      this.build();
    }
  }

  private build() {
    this.treeService.getInitialFilterDemoData().subscribe((data) => {
      this.data = data;

      // Set change detection so the template rebuilds with the new data
      this.changeDetectorRef.markForCheck();
    });
  }

  private get columns(): SohoDataGridColumn[] {
    return this.treeService.getSimpleColumns();
  }
}
