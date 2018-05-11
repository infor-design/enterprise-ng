import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalDialogService,
  SohoModalDialogRef
} from 'ids-enterprise-ng';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';

@Component({
  selector: 'soho-modal-dialog.demo',
  templateUrl: './modal-dialog.demo.html'
})
export class ModalDialogDemoComponent {
  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef })
  placeholder: ViewContainerRef;

  public closeResult: string;

  public title = 'Example Modal Dialog';
  public isAlert = true;

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(private modalService: SohoModalDialogService) {
  }

  openSimple() {
    const dialogRef = this.modalService
      .modal<ExampleModalDialogComponent>(ExampleModalDialogComponent, this.placeholder)
      .buttons([
        { id: 'cancel-button',
          text: Soho.Locale.translate('Cancel'),
          click: (e, modal) => { modal.isCancelled = true; dialogRef.close('CANCEL'); } },
        {
          text: 'Submit', click: (e, modal) => {
            dialogRef.close('SUBMIT');
          }, isDefault: true
        }])
      .title(this.title)
      .isAlert(this.isAlert)
      .apply((dialogComponent) => { dialogComponent.model.header = 'Header Text Update!!'; })
      .open();

    // Attach a listener to the afterClose event, which also gives you the result - if available.
    dialogRef.afterClose((result, ref, dialogComponent) => {
      console.log(dialogComponent.model);
      this.closeResult = result;
    });
  }

  openNested() {
    const dialogRef = this.modalService
      .modal<NestedModalDialogComponent>(NestedModalDialogComponent, this.placeholder)
      .buttons(
      [{ text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
      { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose((result) => {
        this.closeResult = result;
      });
  }

  openMessage() {
    const dialogRef = this.modalService
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(
      [
        { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
        { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }
      ])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
      });
  }

  openVetoableSimple() {
    const dialogRef = this.modalService
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(
      [
        { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
        { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }
      ])
      .title(this.title)
      .open()
      .beforeClose((ref) => ref.dialogResult === 'CANCEL')
      .afterClose(result => {
        this.closeResult = result;
      });
  }

  openVetoable() {
    const dialogRef = this.modalService
      .modal(VetoableModalDialogComponent, this.placeholder)
      .buttons(
      [
        { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
        { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
      });
  }

  openDialogResult() {
    const dialogRef = this.modalService
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(
      [{ text: 'YES', click: () => { dialogRef.close('YES'); } },
      { text: 'NO', click: () => { dialogRef.close('NO'); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        alert(`You selected ${result}`);
        this.closeResult = result;
      });
  }
}
