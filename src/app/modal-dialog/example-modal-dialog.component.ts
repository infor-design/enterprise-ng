import { Component } from '@angular/core';
import { SohoModalDialogRef } from '../../soho/modal-dialog';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'example-modal-dialog.component.html'
})
export class ExampleModalDialogComponent {
  /**
   * Constructor, taking the interface to the Soho Modal Dialog Api.
   */
  constructor(public dialogRef: SohoModalDialogRef<ExampleModalDialogComponent>) {
  }
}
