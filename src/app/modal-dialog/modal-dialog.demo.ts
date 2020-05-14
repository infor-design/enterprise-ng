import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalDialogService
} from 'ids-enterprise-ng';

import { FullSizeModalDialogComponent } from './example-fullsize-modal.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';
import { ModalDialogDataGridComponent } from './modal-dialog-datagrid.component';

@Component({
  selector: 'app-modal-dialog-demo',
  templateUrl: 'modal-dialog.demo.html'
})
export class ModalDialogDemoComponent {
  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
  placeholder: ViewContainerRef;

  public closeResult = '(N/A)';
  public title = 'Example Modal Dialog';

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(private modalService: SohoModalDialogService) {
  }

  openFullSize() {
    const dialogRef = this.modalService
      .modal<FullSizeModalDialogComponent>(FullSizeModalDialogComponent, this.placeholder)
      .title(this.title)
      .buttons(
        [
          { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
          { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }
        ])

      .open();
  }

  openNested() {
    const dialogRef = this.modalService
      .modal<NestedModalDialogComponent>(NestedModalDialogComponent, this.placeholder)
      .buttons(
        [{ text: 'Cancel', click: () => { dialogRef.close(); } },
        { text: 'Submit', click: () => { dialogRef.close(); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose((result) => {
        this.closeResult = result;
      });
  }

  openMessage() {
    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
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
      .message('<span class="message">Are you sure you want to delete this page?</span>')
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
      .message('<span class="message">Are you sure you want to delete this page?</span>')
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

  public openDialogDataGrid() {
    const dialogRef = this.modalService
      .modal(ModalDialogDataGridComponent, this.placeholder)
      .buttons(
        [{ text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
        { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
      });
  }
}
