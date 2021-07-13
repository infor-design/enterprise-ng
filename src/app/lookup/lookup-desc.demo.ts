import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { appInstanceColumns, appInstanceData } from './mock.data';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SohoLookupComponent } from 'ids-enterprise-ng';

export interface FakeResponse {
  response: number;
  total: number;
  data: Object[];
}

@Component({
  selector: 'app-lookup-desc',
  templateUrl: 'lookup-desc.demo.html',
})
export class LookupDescDemoComponent implements AfterViewInit {
  public columns_desc?: SohoDataGridColumn[];
  public data_appInstance?: any[];
  public model: any = { desc: null };
  public context = this;
  public form: FormGroup;
  private formGroup: { [key: string]: any } = {};
  public previouslySelectedRows: any[] = [];
  public processing = false;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(this.formGroup);
    this.form.addControl('appInstance_desc', new FormControl([]));
    this.setupAppInstance();
  }

  ngAfterViewInit() {}

  requestData(filter?: string, page?: number, pagesize?: number): Promise<FakeResponse> {
    // This acts as a fake response from the server, therefore all computations
    // would be done server-side
    return new Promise((resolve) => {
      let dataResult = appInstanceData;

      if (filter) {
        // Server filtering
        dataResult = appInstanceData.filter(data => {
          return data.id.toString().includes(filter) ||
            data.applicationInstanceName.toLowerCase().includes(filter);
        });
      }

      // Server supports paging
      if (!page || !pagesize) {
        return;
      }

      const startIndex = (page - 1) * pagesize;
      const endIndex = page * pagesize;
      dataResult = dataResult.slice(startIndex, endIndex);

      // Set a timeout to simulate time for server to respond
      setTimeout(() => {
        resolve({
          response: 200,
          total: appInstanceData.length,
          data: dataResult
        });
      }, 10);
    });
  }

  setupAppInstance() {
    this.columns_desc = [];
    this.data_appInstance = [];

    // Some Sample Data
    appInstanceData.forEach(data => {
      this.data_appInstance?.push(data);
    });

    // Define Columns for the Grid.
    appInstanceColumns.forEach(column => {
      this.columns_desc?.push(column);
    });

  }

  clearModel() {
    this.model.desc = '';
  }

  /**
   * If source is used for a datagrid, then the datagrid is expected to be paged.
   * This means we need to pass an options of 'paged: true' to the datagrid, this
   * can be supplemented with modifying the page sizes and current page size (can be
   * a set user configuration within the application).
   */
  source(req: SohoDataGridSourceRequest, response: SohoDataGridResponseFunction) {
    const filter = req.filterExpr && req.filterExpr[0] && req.filterExpr[0].value;
    this.requestData(filter, req.activePage, req.pagesize).then(result => {
      req.total = result.total;
      response(result.data, req);
    });
  }

  onSelected(e: any) {
    if (this.processing) {
      return;
    }
    this.previouslySelectedRows = e.selectedRows?.slice();
    console.log('selected', this.previouslySelectedRows);
  }

  onAfterpaging(e: any) {
    this.processing = true;
    e.lookup.grid.unSelectAllRows(true);
    for (const selectedRow of this.previouslySelectedRows) {
      e.lookup.selectRowByValue('id', selectedRow.data.id);
    }

    // If using the contextual toolbar
    if (e.lookup.grid.contextualToolbar) {
      e.lookup.grid.syncSelectedUI();
      e.lookup.grid.contextualToolbar.find('.selection-count').text(`${this.previouslySelectedRows.length} ${Soho.Locale.translate('Selected')}`);
    }
    e.lookup.isChanged = false;
    this.processing = false;
  }
}
