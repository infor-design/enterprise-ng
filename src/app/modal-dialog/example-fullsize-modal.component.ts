import { Component } from '@angular/core';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'example-fullsize-modal.component.html'
})
export class FullSizeModalDialogComponent {
  public model = {
    header: 'Full Size Modal'
  };
}
