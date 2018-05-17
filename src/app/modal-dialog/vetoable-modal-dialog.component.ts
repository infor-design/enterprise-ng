import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {
  SohoModalDialogRef,
  SohoModalDialogVetoableEventGuard
} from 'ids-enterprise-ng';

/**
 * This is an example of a vetoable dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: './vetoable-modal-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VetoableModalDialogComponent implements SohoModalDialogVetoableEventGuard<VetoableModalDialogComponent> {
  public allowOpen = true; // SOHO-4892 - causes problems with all dialogs if false!
  public allowClose = false;
  public allowDestroy = true; // SOHO-4892 - caused problems with all dialogs if false.

  /**
   * Constructor, taking the interface to the Soho Modal Dialog Api.
   */
  constructor(private dialogRef: SohoModalDialogRef<VetoableModalDialogComponent>) {
  }

  beforeOpen(): boolean {
    console.log(`beforeOpen: ${this.allowOpen}`);
    return this.allowOpen;
  }

  beforeClose(dialogRef: SohoModalDialogRef<VetoableModalDialogComponent>): boolean {
    console.log(`beforeClose: ${this.allowClose}`);
    return this.allowClose || dialogRef.dialogResult === 'CANCEL';
  }

  beforeDestroy() {
    console.log(`beforeDestroy: ${this.allowDestroy}`);
    return this.allowDestroy;
  }

}
