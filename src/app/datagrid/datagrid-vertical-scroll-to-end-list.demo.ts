import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent, SohoToastService } from 'ids-enterprise-ng';
import { CODE_BLOCK_DATA } from '../demodata/code-block-data';

@Component({
    selector: 'app-datagrid-vertical-scroll-to-end-list',
    templateUrl: 'datagrid-vertical-scroll-to-end-list.demo.html',
    styleUrls: ['../code-block/code-block.formatter.css'],
    standalone: false
})
export class DataGridVerticalScrollListDemoComponent implements OnInit {
    @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

    private position: SohoToastPosition = SohoToastService.TOP_RIGHT;

    public columns: SohoDataGridColumn[] = [
        { id: 'companyId', name: 'Company', field: 'companyId', width: 200 },
        { id: 'companyName', name: 'Name', field: 'companyName', width: 200 }
    ];

    public data = CODE_BLOCK_DATA;
    public gridOptions: any = undefined;

    constructor(private toastService: SohoToastService) { }

    ngOnInit(): void {
        this.gridOptions = {
            dataset: this.data,
            columns: this.columns,
            pagesize: 25,
            isList: true,
        };
    }

    onVerticalScroll(_args: any) {
        if (_args.percent >= 90 && _args.percent < 100) {
            console.log(`${_args.percent}% scrolled, Almost there!`);
        } else if (_args.percent < 100) {
            console.log(`${_args.percent}% scrolled`);
        } else if (this.datagrid && this.datagrid.isVerticalScrollToEnd) {
            this.toastService.show({ title: 'Vertical Scroll End', message: 'Hooray! You reached the bottom of the list!' });
        }
    }

    onRowClicked(_args: any) {
        console.log('click', _args)
    }
}