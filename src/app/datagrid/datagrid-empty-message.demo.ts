import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { SohoDataGridComponent } from '@infor/sohoxi-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataGridDemoService } from './datagrid-demo.service';

@Component({
  selector: 'soho-datagrid-empty-message-demo',
  templateUrl: './datagrid-empty-message.demo.html',
  providers: [ DataGridDemoService ]
})
export class DataGridEmptyMessageDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) dataGrid: SohoDataGridComponent;

  public get toggleButtonName() {
    return this.hasData ? 'Clear Data' : 'Add Data';
  }

  public hasData: boolean;

  emptyMessage: SohoDataGridEmptyMessageOptions = {
    title: 'Server Error',
    info: 'The target server returned an error',
    icon: 'icon-empty-error-loading', // needs to be the full SVG name
    button: { text: 'Retry', click: () => { alert('try again'); } }
  };

  get data() {
   return this.hasData ? this.service.data : [];
  }

  constructor(private service: DataGridDemoService) { }

  ngAfterViewInit() {
  }

  public get columns(): SohoDataGridColumn[] {
    return this.service.getColumns();
  }

  makeChange() {
    this.hasData = !this.hasData;
  }

  /**
   * Sets the empty message to a different one from the default, or
   * the one defined in the markup.
   */
  changeMessage() {
    this.dataGrid.emptyMessage = {
      title: 'No Matches',
      info: 'No products found that match your query',
      icon: 'icon-empty-no-orders', // needs to be the full SVG name
      button: { text: 'Retry', click: () => { alert('try again'); } }
    };
  }

  /**
   * Sets the message back to the starting message defined in the markup.
   */
  resetMessage() {
    this.dataGrid.emptyMessage = this.emptyMessage;
  }

  /**
   * Sets the message to the default - this can be null or undefined.
   */
  defaultMessage() {
    this.dataGrid.emptyMessage = null;
  }
}
