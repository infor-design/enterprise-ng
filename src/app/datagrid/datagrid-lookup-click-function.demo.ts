import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import {
  SohoDataGridComponent,
  SohoModalDialogService
} from 'ids-enterprise-ng';
import { PAGING_COLUMNS, PAGING_DATA } from './datagrid-paging-data';
import { DataGridLookupDialogDemoComponent } from './datagrid-lookup-dialog.demo';
import { DataGridLookupSelectionEvent } from './datagrid-lookup-event.demo';

@Component({
  selector: 'app-datagrid-lookup-click-function-demo',
  templateUrl: 'datagrid-lookup-click-function.demo.html'
})
export class DataGridLookupClickDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent: SohoDataGridComponent;
  @ViewChild('modalPlaceholder', { read: ViewContainerRef, static: true })
  modalPlaceholder: ViewContainerRef;

  gridOptions = undefined;

  constructor(private modalService: SohoModalDialogService) { }

  ngOnInit(): void {
    /**
     * Add a column to demonstrate the lookup click function
     * don't want to change the existing data in datagrid-paging-data.
     */
    const columns: SohoDataGridColumn[] = [];
    PAGING_COLUMNS.forEach(element => columns.push(element));

    columns.push({
      id: 'lookup-click',
      name: 'Lookup Click',
      field: 'productId',
      editor: Soho.Editors.Lookup,
      editorOptions: { editable: true, click: LMLookupClickFunction }
    });

    this.gridOptions = {
      columns,
      dataset: PAGING_DATA,
      selectable: 'mixed',
      paging: true,
      pagesize: 10,
      editable: true,
      userObject: this
    };
  }

  public listLookupClick(sohoLookup: SohoLookupStatic, sourceField: string) {
    const dialogRef = this.modalService
      .modal(DataGridLookupDialogDemoComponent, this.modalPlaceholder)
      .buttons([
        {
          text: 'Cancel',
          click: () => {
            dialogRef.close('CANCEL');
          },
          isDefault: true
        }
      ])
      .title('Select Product')
      .open()
      .apply((lookupDialog: DataGridLookupDialogDemoComponent) => {
        lookupDialog.lookupSelection.subscribe(
          (
            event: DataGridLookupSelectionEvent<
              DataGridLookupDialogDemoComponent
            >
          ) => {
            const result: Array<any> = event.rows;
            if (result && Array.isArray(result) && result.length > 0) {
              const dataView = result[0].data;
              const value = dataView[sourceField] as string;

              // TODO: Tim is there a better solution to move
              // the selected value into the lookup input element?
              sohoLookup.element.val(value);
              sohoLookup.element.trigger('focus');
            }

            dialogRef.close();
          }
        );
      });
  }
}

function LMLookupClickFunction(
  event: any,
  lookup: SohoLookupStatic,
  clickArguments: any
) {
  const lookupClickDemoComponent = clickArguments.grid.settings.userObject;
  const sourceField = clickArguments.column.field;
  lookupClickDemoComponent.listLookupClick(lookup, sourceField);
}
