import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { DataGridDemoService } from './datagrid-demo.service';

@Component({
  selector: 'app-datagrid-empty-message-demo',
  templateUrl: 'datagrid-empty-message.demo.html',
  providers: [ DataGridDemoService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridEmptyMessageDemoComponent implements AfterViewInit {
  private static EMPTY_MSG_SERVER_ERROR: SohoEmptyMessageOptions = {
    title: 'Server Error',
    icon: 'icon-empty-error-loading', // needs to be the full SVG name
    button: { isPrimary: true, text: 'Retry', click: () => { alert('try again'); } }
  };

  private static EMPTY_MSG_NO_MATCHES: SohoEmptyMessageOptions = {
    title: 'No Matches',
    icon: 'icon-empty-no-orders', // needs to be the full SVG name
    button: { text: 'Retry', click: () => { alert('try again'); } },
    color: 'azure'
  };

  @ViewChild(SohoDataGridComponent, { static: true }) dataGrid: SohoDataGridComponent;

  public hasData: boolean;
  public emptyMessage: SohoEmptyMessageOptions = DataGridEmptyMessageDemoComponent.EMPTY_MSG_SERVER_ERROR;

  constructor(private service: DataGridDemoService) { }

  ngAfterViewInit() {
  }

  public get toggleButtonName() {
    return this.hasData ? 'Clear Data' : 'Add Data';
  }

  public get data() {
    return this.hasData ? this.service.data : [];
  }

  public get columns(): SohoDataGridColumn[] {
    return this.service.getColumns();
  }

  public makeChange() {
    this.hasData = !this.hasData;
  }

  /**
   * Sets the empty message to a different one from the default, or
   * the one defined in the markup.
   */
  public changeMessage() {
    this.emptyMessage = DataGridEmptyMessageDemoComponent.EMPTY_MSG_NO_MATCHES;
  }

  /**
   * Sets the message back to the starting message defined in the markup.
   */
  public resetMessage() {
    this.emptyMessage = DataGridEmptyMessageDemoComponent.EMPTY_MSG_SERVER_ERROR;
  }

  /**
   * Sets the message to the default - this can be null or undefined.
   */
  public defaultMessage() {
    this.emptyMessage = null;
  }
}
