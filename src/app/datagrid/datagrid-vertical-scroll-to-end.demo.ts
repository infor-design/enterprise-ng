import { Component, ViewChild } from '@angular/core';
import { SohoDataGridComponent, SohoToastService } from 'ids-enterprise-ng';
import { CODE_BLOCK_DATA } from '../demodata/code-block-data';

@Component({
    selector: 'app-datagrid-vertical-scroll-to-end',
    templateUrl: 'datagrid-vertical-scroll-to-end.demo.html',
    styleUrls: ['../code-block/code-block.formatter.css']
})
export class DataGridVerticalScrollDemoComponent {
  @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

  private position: SohoToastPosition = SohoToastService.TOP_RIGHT;

  public columns: SohoDataGridColumn[] = [
    { id: 'companyId', name: 'Company', field: 'companyId', width: 200},
    { id: 'companyName', name: 'Name', field: 'companyName', width: 200}
  ];

  public data = CODE_BLOCK_DATA;

  constructor(private toastService: SohoToastService) {}

  onVerticalScroll(_args: any) {
    if (_args.percent  >= 95 && _args.percent < 100) {
      console.log( `${_args.percent}% scrolled, Almost there!`);
    } else if (_args.percent < 100) {
      console.log( `${_args.percent}% scrolled`);
    } else if (this.datagrid && this.datagrid.isVerticalScrollToEnd) {
      this.toastService.show({ title: 'Vertical Scroll End', message: 'Hooray! You reached the bottom of the list!' });
    }
  }

  onRowClicked(_args:any) {
    console.log('click', _args)
  }
}