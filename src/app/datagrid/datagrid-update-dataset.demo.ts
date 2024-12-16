import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { SohoDataGridComponent } from "ids-enterprise-ng";

export class CodeModel {
    constructor(
        public ID: string = '',
        public NAME: string = '',
    ) { }
}

@Component({
    selector: "app-datagrid-update-dataset-demo",
    templateUrl: "datagrid-update-dataset.demo.html",
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class DataGridUpdateDatasetDemoComponent implements OnInit {
    timeOffList: Array<CodeModel> = [
        new CodeModel('DTO', 'Paid Time Off'),
        new CodeModel('SICK', 'Sick'),
    ];
    statusList: Array<CodeModel> = [
        new CodeModel('R', 'Released'),
        new CodeModel('F', 'Firm'),
        new CodeModel('U', 'Unreleased')
    ];
    model: Array<any> = [];
    codeList: Array<string> = ['Timeoff list', 'Status list'];
    selectedCodeList: string = '';

    gridOptions: SohoDataGridOptions = {};

    column = [
        { name: "ID", field: "ID", },
        { name: "NAME", field: "NAME" }
    ];

    @ViewChild(SohoDataGridComponent, { static: true }) datagrid?: SohoDataGridComponent;

    ngOnInit(): void {
        this.model = this.timeOffList;
        this.gridOptions = {
            columns: this.column,
            dataset: this.model
        };
    }

    onChange(e: any) {
        this.selectedCodeList = e.data;
        switch (this.selectedCodeList) {
            case 'Timeoff list':
                this.model = this.timeOffList;
                break;
            case 'Status list':
                this.model = this.statusList;
                break;
        }

        this.datagrid?.updateDataset(this.model);
    }

    onAddClicked() {
        this.datagrid?.addRow(new CodeModel('NEW', 'NEWCODE'), 'top');
        const msg = this.datagrid?.dataset?.length === this.model.length ? 'success' : 'fail ' + this.datagrid?.dataset?.length + '!=' + this.model.length;
        console.log('AppComponent.onAddClicked ' + msg);
    }
}
