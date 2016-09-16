import {
  Component,
  ViewContainerRef
} from '@angular/core';

import {
  SohoModelDialogComponent,
  SohoModalDialogRef
} from '../../components/dialog';

@Component({
  selector: 'soho-modal-dialog-demo',
  templateUrl: 'soho-modal-dialog.demo.html',
})
export class ModalDialogDemoComponent {
  dialogRef: SohoModalDialogRef<MyDialog>;
  lastCloseResult: string;

  constructor(
    public dialog: SohoModalDialogComponent,
    public viewContainerRef: ViewContainerRef) {}
}
