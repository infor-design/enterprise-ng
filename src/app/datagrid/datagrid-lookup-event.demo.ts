import { DataGridLookupDialogDemoComponent } from './datagrid-lookup-dialog.demo';

export class DataGridLookupSelectionEvent {
  constructor(public eventSource: DataGridLookupDialogDemoComponent,
              public rows: Array<any>) {
  }
}
