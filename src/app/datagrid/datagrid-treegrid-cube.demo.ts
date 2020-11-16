import { AfterViewInit, OnInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoChartComponent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tree-cube-demo',
  templateUrl: 'datagrid-treegrid-cube.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataGridTreeGridCubeDemoComponent implements OnInit, AfterViewInit {
  @ViewChild(SohoChartComponent) sohoChartComponent?: SohoChartComponent;
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;

  private _columns?: SohoDataGridColumn[];
  private _data: any;
  private _chartData?: Array<SohoDataSetItem>;

  ngOnInit() {

  }

  ngAfterViewInit() {
    const options: SohoDataGridOptions = (this.sohoDataGridComponent as any).gridOptions;
    options.enableTooltips = true;
    (this.sohoDataGridComponent as any).gridOptions = options;
    (this.sohoDataGridComponent as any).selectRows(0);
  }

  public get columns(): SohoDataGridColumn[] {
    return this.getColumns();
  }

  private getColumns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = [];
      /* tslint:disable */
      this._columns.push({ align: 'left', id: 'Dimension', name: 'Recruiter', field: 'Dimension', formatter: Soho.Formatters.Tree, width: 250 });
      this._columns.push({ align: 'right', id: 'NumberOfCandidates', name: 'Candidates', field: 'NumberOfCandidates', width: 90 });
      this._columns.push({ align: 'right', id: 'InterviewCount', name: 'Interviews', field: 'InterviewCount', width: 85 });
      this._columns.push({ align: 'right', id: 'OfferCount', name: 'Offers', field: 'OfferCount', width: 75 });
      this._columns.push({ align: 'right', id: 'HireCount', name: 'Hire', field: 'HireCount', width: 75 });
      /* tslint:enable */
    }
    return this._columns;
  }

  public get data(): any[] {
    return this.getData();
  }

  private getData(): any[] {
    if (!this._data) {
      /* tslint:disable */
      this._data = [
        {
          id: 1, depth: 1, parentId: 0, expanded: false, Dimension: 'Schroder, Helen', NumberOfCandidates: 18, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
            {
              id: 2, depth: 2, parentId: 1, expanded: false, Dimension: 'College Recruiting', NumberOfCandidates: 4, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
                { id: 3, depth: 3, parentId: 2, expanded: false, Dimension: 'UMN', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
                { id: 4, depth: 3, parentId: 2, expanded: false, Dimension: 'UMD', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
              ]
            },
            { id: 5, depth: 2, parentId: 1, expanded: false, Dimension: 'Employee Referral', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
            {
              id: 6, depth: 2, parentId: 1, expanded: false, Dimension: 'Third Party Job Boards', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
                { id: 7, depth: 3, parentId: 6, expanded: false, Dimension: 'Monster', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
              ]
            },
            { id: 8, depth: 2, parentId: 1, expanded: false, Dimension: 'Employee Transfer', NumberOfCandidates: 10, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
            { id: 9, depth: 2, parentId: 1, expanded: false, Dimension: 'Walk In', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
          ]
        },
        {
          id: 10, depth: 1, parentId: 0, expanded: false, Dimension: 'Tyler, Mary', NumberOfCandidates: 41, InterviewCount: 2, OfferCount: 12, HireCount: 14, children: [
            {
              id: 11, depth: 2, parentId: 10, expanded: false, Dimension: 'Advertisement', NumberOfCandidates: 5, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
                { id: 12, depth: 3, parentId: 11, expanded: false, Dimension: 'News Paper', NumberOfCandidates: 4, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
                { id: 13, depth: 3, parentId: 11, expanded: false, Dimension: 'Radio', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
              ]
            },
            { id: 14, depth: 2, parentId: 10, expanded: false, Dimension: 'Agency', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 1, HireCount: 1 },
            { id: 15, depth: 2, parentId: 10, expanded: false, Dimension: 'Client Referral', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 1, HireCount: 1 },
            { id: 16, depth: 2, parentId: 10, expanded: false, Dimension: 'College Recruiting', NumberOfCandidates: 11, InterviewCount: 0, OfferCount: 1, HireCount: 0 },
            { id: 17, depth: 2, parentId: 10, expanded: false, Dimension: 'Employee Referral', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
            { id: 18, depth: 2, parentId: 10, expanded: false, Dimension: 'Third Party Job Boards', NumberOfCandidates: 1, InterviewCount: 1, OfferCount: 0, HireCount: 1 },
            { id: 19, depth: 2, parentId: 10, expanded: false, Dimension: 'Job Fair', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
            { id: 20, depth: 2, parentId: 10, expanded: false, Dimension: 'Employee Transfer', NumberOfCandidates: 5, InterviewCount: 0, OfferCount: 3, HireCount: 2 },
            { id: 21, depth: 2, parentId: 10, expanded: false, Dimension: 'Walk In', NumberOfCandidates: 13, InterviewCount: 1, OfferCount: 6, HireCount: 9 },
          ]
        },
        {
          id: 22, depth: 1, parentId: 0, expanded: false, Dimension: 'Polk, Anne', NumberOfCandidates: 3, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
            { id: 23, depth: 2, parentId: 22, expanded: false, Dimension: 'Job Fair', NumberOfCandidates: 1, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
            { id: 24, depth: 2, parentId: 22, expanded: false, Dimension: 'Employee Transfer', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
          ]
        },
        {
          id: 25, depth: 1, parentId: 0, expanded: false, Dimension: 'Taylor, Sarah', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0, children: [
            { id: 26, depth: 2, parentId: 25, expanded: false, Dimension: 'Employee Transfer', NumberOfCandidates: 2, InterviewCount: 0, OfferCount: 0, HireCount: 0 },
          ]
        },
      ];
      /* tslint:enable */
    }
    return this._data;
  }

  onSelected(e: SohoDataGridSelectedEvent) {
    if (e.rows) {
      // Choose chart data
      const row = e.rows[0];
      const parentId = row.data.parentId;
      const parentNode = this.findParentNode(this.getData(), parentId);
      const dataNodes = (parentNode === null) ? this.getData() : parentNode.children;
      // Build chart data for all level 1 rows.
      // Or
      // Build chart data for all children of a given parent.
      this._chartData = this.buildChartData(dataNodes);
      this.setChartOptions();
    }
  }

  private findParentNode(data: any[], parentId: number): any {
    let parentNode = null;
    if (parentId === 0) {
      return parentNode;
    }

    data.some((row) => {
      if (row.id === parentId) {
        parentNode = row;
        return true;
      }
      if (row.children && Array.isArray(row.children) && row.children.length > 0) {
        parentNode = this.findParentNode(row.children, parentId);
        if (parentNode !== null) {
          return true;
        }
      }
    });
    return parentNode;
  }

  private buildChartData(data: any[]): Array<SohoDataSetItem> {
    const chartData: Array<SohoDataSetItem> = [];
    data.forEach((row: any, _index: number) => {
      const chartRow: SohoDataSetItem = {} as SohoDataSetItem;
      chartRow.name = row.Dimension;
      chartRow.data = [];
      chartRow.data.push({ name: 'Candidates', ref: 0, value: row.NumberOfCandidates });
      chartRow.data.push({ name: 'Hired', ref: 1, value: row.HireCount });
      chartData.push(chartRow);
    });
    return chartData;
  }

  private setChartOptions() {
    const chartOptions: SohoChartOptions = { dataset: this._chartData, type: 'column', animate: false, showLegend: false };
    (this.sohoChartComponent as any).chartOptions = chartOptions;
  }

  public get chartData(): Array<SohoDataSetItem> | undefined {
    return this._chartData;
  }
}
