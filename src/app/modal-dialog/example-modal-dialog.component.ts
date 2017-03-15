import { Component } from '@angular/core';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: './example-modal-dialog.component.html'
})
export class ExampleModalDialogComponent {

   public model = {
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of this week.',
  };

  constructor() {
  }
}
