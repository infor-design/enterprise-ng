import { Component } from '@angular/core';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: './example-modal-dialog.component.html'
})
export class ExampleModalDialogComponent {

  public model = { // tslint:disable-line
    header: 'Default Header Text',
    counterText: 'This text cannot exceed 90 chars',
  };
  constructor() {
  }
}
