import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Inject,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { SohoInputComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'soho-custom-editor',
    templateUrl: './custom-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomEditorComponent implements AfterViewInit, SohoDataGridCellEditor {
    value: string = '';
    editable: boolean = false;
    row?: any;
    cell?: any;
    container?: any;
    column?: SohoDataGridColumn;
    event?: any;
    grid?: any;
    rowData?: any;
    item?: any;
    editor?: SohoDataGridCellEditor;
    //input: any;

    @ViewChild('input', { static: true }) input?: SohoInputComponent;

    constructor(@Inject('args') public args: any) {
        this.value = args.value;
        this.row = args.row;
        this.cell = args.cell;
        this.container = args.container;
        this.column = args.col;
        this.event = args.e;
        this.grid = args.api;
        this.item = args.item;
        this.editable = !this.item.parameterNull;
    }

    ngAfterViewInit(): void {
        this.getEditors();
    }

    initEditor(input: any) {
        if (this.editor) {
            (this.editor as any).init();
            input = (this.editor as any).input;
            this.input = input;
        }
    }

    val(value?: any) {
        if (value) {
            this.value = value;
        }
        console.log('val', this.value);
        return this.value;
    }

    focus() {
        this.input?.focus();
    }

    getEditors() {
        let dataType = this.item.parameterType;
        if (this.editable) {
            if (dataType === 1) {
                console.log('Trying to set editor to Soho.Editors.Checkbox');
                this.editor = new (Soho.Editors.Checkbox as any)(
                    this.row,
                    this.cell,
                    this.value,
                    this.container,
                    this.column,
                    this.event,
                    this.grid,
                    this.item
                );
            } else if (dataType === 2) {
                console.log('Trying to set editor to Soho.Editors.Date');
                this.editor = new (Soho.Editors.Date as any)(
                    this.row,
                    this.cell,
                    this.value,
                    this.container,
                    this.column,
                    this.event,
                    this.grid,
                    this.item
                );
            } else {
                console.log('Trying to set editor to Soho.Editors.Input');
                this.editor = new (Soho.Editors.Input as any)(
                    this.row,
                    this.cell,
                    this.value,
                    this.container,
                    this.column,
                    this.event,
                    this.grid,
                    this.item
                );
            }
        }
    }
}
