import { Component } from '@angular/core';

// @ts-ignore
import groups from './groups.json';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'modal-dialog-datagrid.component.html'
})
export class ModalDialogDataGridComponent {
  /**
   * Define the user grid columns
   */
  private USER_FORM_GROUP_GRID_COLUMNS: SohoDataGridColumn[] = [
    {
      id: 'selectionCheckbox',
      sortable: false,
      resizable: false,
      field: 'isChecked',
      formatter: Soho.Formatters.SelectionCheckbox,
      width: 100,
      align: 'center',
      exportable: false
    },
    {
      id: 'groupName',
      name: 'Name',
      field: 'groupName',
      sortable: true,
      filterType: 'text',
      width: 300,
      expanded: 'expanded',
      formatter: Soho.Formatters.Tree
    },
    {
      id: 'description',
      name: 'Description',
      field: 'description',
      sortable: true,
      filterType: 'text',
      width: 700,
      formatter: Soho.Formatters.Readonly
    }
  ];

  get columns(): SohoDataGridColumn[] {
    return this.USER_FORM_GROUP_GRID_COLUMNS;
  }

  get data(): any[] {
    return groups;
  }
}
