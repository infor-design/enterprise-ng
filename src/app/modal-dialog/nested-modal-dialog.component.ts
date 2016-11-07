import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  SohoModalDialogRef,
  SohoModalDialogService
} from '@infor/sohoxi-angular';

/**
 * This is an example of a nested dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'nested-modal-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedModalDialogComponent {

  public static depth = 1;

  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef })
  placeholder: ViewContainerRef;

  /**
   * Constructor, taking the interface to the Soho Modal Dialog Api.
   */
  constructor(
    private dialogRef: SohoModalDialogRef<NestedModalDialogComponent>,
    private dialog: SohoModalDialogService) {
  }

  openModel() {
    this.dialog
      .modal(NestedModalDialogComponent, this.placeholder)
      .title(`Modal Dialog no. '${NestedModalDialogComponent.depth++}'.`)
      .buttons(
        [{text: 'Cancel', click: (e, modal) => { modal.close(true); }},
         {text: 'OK', click: (e, modal) => { modal.close(true); }, isDefault: true}])
      .afterClose((f) => { NestedModalDialogComponent.depth--; })
      .open();
  }
}
