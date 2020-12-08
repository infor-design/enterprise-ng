import {
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

// @ts-ignore
import { SohoModalDialogService } from 'ids-enterprise-ng';

/**
 * This is an example of a nested dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'nested-modal-dialog.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedModalDialogComponent {

  public static s_depth = 1;

  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  placeholder?: ViewContainerRef;

  /**
   * Constructor, taking the interface to the Soho Modal Dialog Api.
   */
  constructor(private dialog: SohoModalDialogService) { }

  public get depth(): number {
    return NestedModalDialogComponent.s_depth;
  }

  openModel() {
    this.dialog
      .modal(NestedModalDialogComponent, this.placeholder)
      .title(`Modal Dialog no. '${++NestedModalDialogComponent.s_depth}'.`)
      .buttons(
        [{ text: 'Cancel', click: (_e: any, modal: any) => { modal.close(true); } },
        { text: 'OK', click: (_e: any, modal: any) => { modal.close(true); }, isDefault: true }])
      .afterClose((_f: any) => { NestedModalDialogComponent.s_depth--; })
      .open();
  }
}
