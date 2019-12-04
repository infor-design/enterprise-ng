import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalRef,
  SohoModalService,
  SohoModalDialogService
} from 'ids-enterprise-ng';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';
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

  public closeResult: string;

  public title = 'Example Modal Dialog';
  public isAlert = false;
  public allowOpen = false;

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(
    private modalService: SohoModalDialogService,
    private newModalService: SohoModalService) {
  }

  public dialogRef: SohoModalRef<ExampleModalDialogComponent>;

  openSimple() {
    if (this.dialogRef) {
      return this.dialogRef.open();
    }

    this.dialogRef = this.newModalService
      .modal<ExampleModalDialogComponent>(ExampleModalDialogComponent)
      .buttons([
        {
          id: 'cancel-button',
          text: Soho.Locale.translate('Cancel'),
          click: (e) => { this.dialogRef.close('CANCEL'); }
        },
        {
          text: 'Submit', click: (e, modal) => {
            this.dialogRef.close(this.dialogRef.componentDialog.model.comment);
          }, isDefault: true
        }
      ])
      .title(this.title)
      .isAlert(this.isAlert)
      .apply((componentDialog) => {
        componentDialog.model.header = 'Header Text Update!!';
      })
      .open();

    // Attach a listener to the afterClose event, which also gives you the result - if available.
    this.dialogRef
      .opened(() => console.log('dialog opened'))
      .afterOpen(() => console.log('dialog afterOpen'))
      .closed(() => console.log('dialog closed'))
      .afterClose((result) => {
        this.closeResult = result;
        console.log(`dialog afterClose result: {result}`);
      })
      .beforeOpen(() => this.allowOpen)
      .beforeClose(() => this.dialogRef.componentDialog.allowClose)
      .beforeDestroy(() => {
        if (this.dialogRef.componentDialog.allowDestroy) {
          this.dialogRef = null;
          return true;
        }
        return false;
      });
  }

  destroyModal() {
    this.dialogRef.destroy();
    this.dialogRef = null;
  }

  openFullSize() {
    const dialogRef = this.modalService
      .modal<FullSizeModalDialogComponent>(FullSizeModalDialogComponent, this.placeholder)
      .buttons(
        [{ text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
        { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
      .title(this.title)
      .isAlert(this.isAlert)
      .fullsize('responsive')
      .breakpoint('phablet')
      .apply((dialogComponent) => { dialogComponent.model.header = 'Header Text Update!!'; })
      .open()
      .afterClose(result => {
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
