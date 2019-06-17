import { Component, OnDestroy } from '@angular/core';
import {
  SohoModalDialogRef
} from 'ids-enterprise-ng';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: './example-modal-dialog.component.html'
})
export class ExampleModalDialogComponent implements OnDestroy {
   public model = {
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of this week.',
   };

  constructor(private dialogRef: SohoModalDialogRef<ExampleModalDialogComponent>) {
  }

  ngOnDestroy(): void {
    this.dialogRef.close(true);
  }
}
