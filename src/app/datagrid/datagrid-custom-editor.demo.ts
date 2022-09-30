import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
    OnDestroy,
    Inject,
    Output,
    EventEmitter,
} from '@angular/core';
// @ts-ignore
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { CustomEditorComponent } from './custom-editor.component';

const customFormatter = function (
    row: any,
    cell: any,
    value: any,
    col: any,
    item: any,
    api: any
) {
    let type = item.parameterType;
    switch (type) {
        case 1:
            return Soho.Formatters.Checkbox(row, cell, value, col, item, api);
        case 2:
            return Soho.Formatters.Date(row, cell, value, col, item, api);
        case 3:
            return Soho.Formatters.Decimal(row, cell, value, col, item, api);
        case 4:
            return Soho.Formatters.Integer(row, cell, value, col, item, api);
    }

    return Soho.Formatters.Date(row, cell, value, col, item, api);
};

@Component({
    selector: 'soho-datagrid-custom-editor',
    templateUrl: 'datagrid-custom-editor.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatagridCustomEditorComponent implements AfterViewChecked, OnInit {
    @ViewChild(SohoDataGridComponent)
    sohoDataGridComponent?: SohoDataGridComponent;

    constructor() { }

    gridOptions?: SohoDataGridOptions = undefined;
    ngOnInit() {
        this.gridOptions = this.buildGridOptions();
        let i: number = 0;
        for (i = 0; i < 100; i++) {
            this.gridOptions.dataset?.push(this.getRandomParameterData());
        }
    }

    ngAfterViewChecked() { }

    private buildGridOptions(): SohoDataGridOptions {
        return {
            columns: [
                {
                    id: 'parameterName',
                    name: 'Name',
                    field: 'parameterName',
                    sortable: true,
                    resizable: true,
                    width: '50',
                    formatter: Soho.Formatters.Input,
                    validate: 'required',
                },
                {
                    id: 'parameterType',
                    name: 'Data Type',
                    sortable: false,
                    field: 'parameterType',
                    resizable: true,
                    width: '30',
                    formatter: Soho.Formatters.Dropdown,
                    editor: Soho.Editors.Dropdown,
                    options: [
                        { value: 1, label: 'Boolean' },
                        { value: 2, label: 'Date' },
                        { value: 3, label: 'Decimal' },
                        { value: 4, label: 'Integer' },
                        { value: 5, label: 'String' },
                    ],
                },
                {
                    id: 'parameterValue',
                    name: 'Specified Value',
                    sortable: false,
                    field: 'parameterValue',
                    resizable: true,
                    width: '50',
                    isEditable: this.isEditable,
                    formatter: customFormatter,
                    editorComponent: CustomEditorComponent,
                },
            ], // eslint-disable-line
            dataset: [],
            clickToSelect: true,
            selectable: 'mixed',
            rowHeight: 'extra-small',
            disableRowDeactivation: false,
            columnSizing: 'header',
            emptyMessage: null,
            editable: true,
        } as SohoDataGridOptions;
    }

    isEditable(
        row: number,
        cell: any,
        fieldValue: any,
        columnDef: SohoDataGridColumn,
        rowData: any
    ): boolean {
        return true;
    }

    getRandomParameterData() {
        let paramNumber: number = this.getRandomSuffix();
        let paramName: string = 'Parameter ' + paramNumber;
        let paramDesc: string = 'Parameter ' + paramNumber + ' description';
        let paramId: string = 'Parameter' + paramNumber;
        let paramType: number = this.getRandomType();
        let paramNull: boolean = Math.floor(Math.random() * 3) == 0 ? true : false;
        let paramValue: string = '';
        if (!paramNull) {
            switch (paramType) {
                case 1:
                    paramValue = Math.floor(Math.random() * 2).toString();
                    break;
                case 2:
                    paramValue =
                        (Math.floor(Math.random() * 30) + 1).toString() + '/8/2022';
                    break;
                case 3:
                    paramValue = Math.floor(Math.random() * 10000).toString();
                    break;
                case 4:
                    paramValue = (Math.floor(Math.random() * 1000000) / 100).toString();
                    break;
                case 5:
                    paramValue = 'Value for param ' + paramNumber;
            }
        }
        return {
            parameterName: paramName,
            parameterType: paramType,
            parameterNull: paramNull,
            parameterValue: paramValue,
            parameterDesc: paramDesc,
        };
    }

    getRandomSuffix() {
        return Math.floor(Math.random() * 100);
    }

    getRandomType() {
        return Math.floor(Math.random() * 4) + 1;
    }

    validateName() { }
}
