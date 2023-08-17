import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalDialogService, SohoModalDialogRef
} from 'ids-enterprise-ng';

import { FullSizeModalDialogComponent } from './example-fullsize-modal.component';
import { ModalDatepickerComponent } from './modal-datepicker.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';
import { ModalDialogDataGridComponent } from './modal-dialog-datagrid.component';
import { ModalDialogPickerComponent } from './modal-dialog-picker.component';

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
  placeholder?: ViewContainerRef;

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
      .modal<FullSizeModalDialogComponent>(FullSizeModalDialogComponent, this.placeholder, { fullsize: 'responsive' })
      .showCloseBtn(true)
      .title(this.title)
      .icon('check')
      .iconClass('info')
      .buttons(
        [
          {
            text: 'Enable', click: () => {
              const api = dialogRef.buttonsetAPI;
              if (api) {
                api.at(2).disabled = false;
                api.at(3).disabled = false;
              }
            }
          },
          {
            text: 'Disable', click: () => {
              const api = dialogRef.buttonsetAPI;
              if (api) {
                api.at(2).disabled = true;
                api.at(3).disabled = true;
              }
            }
          },
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      .beforeOpen((ref?: SohoModalDialogRef<FullSizeModalDialogComponent>) => {
        (ref as any).buttonsetAPI.at(2).disabled = true;
        return true;
      }).afterOpen((_: any, ref: SohoModalDialogRef<FullSizeModalDialogComponent>) => {
        (ref as any).buttonsetAPI.at(3).disabled = false;
        return true;
      })
      .open();
  }

  openDialogDatepicker() {
    const dialogRef = this.modalService
      .modal<ModalDatepickerComponent>(ModalDatepickerComponent, this.placeholder, { fullsize: 'responsive' })
      .showCloseBtn(true)
      .title(this.title)
      .buttons(
        [
          {
            text: 'Enable', click: () => {
              const api = dialogRef.buttonsetAPI;
              if (api) {
                api.at(2).disabled = false;
                api.at(3).disabled = false;
              }
            }
          },
          {
            text: 'Disable', click: () => {
              const api = dialogRef.buttonsetAPI;
              if (api) {
                api.at(2).disabled = true;
                api.at(3).disabled = true;
              }
            }
          },
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      .beforeOpen((ref?: SohoModalDialogRef<ModalDatepickerComponent>) => {
        (ref as any).buttonsetAPI.at(2).disabled = true;
        return true;
      }).afterOpen((_: any, ref: SohoModalDialogRef<ModalDatepickerComponent>) => {
        (ref as any).buttonsetAPI.at(3).disabled = false;
        return true;
      })
      .open();
  }

  openNested() {
    const dialogRef = this.modalService
      .modal<NestedModalDialogComponent>(NestedModalDialogComponent, this.placeholder)
      .buttons(
        [{
          text: 'Cancel', click: () => {
            dialogRef.close();
          }
        },
        {
          text: 'Submit', click: () => {
            dialogRef.close();
          }, isDefault: true
        }])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openMessage() {
    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
      .buttons(
        [
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openVetoableSimple() {
    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
      .buttons(
        [
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      .title(this.title)
      .open()
      .beforeClose((ref: any) => ref.dialogResult === 'CANCEL')
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openVetoable() {
    const dialogRef = this.modalService
      .modal(VetoableModalDialogComponent, this.placeholder)
      .buttons(
        [
          {
            text: 'Cancel', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openDialogResult() {
    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
      .buttons(
        [{
          text: 'YES', click: () => {
            dialogRef.close('YES');
          }
        },
        {
          text: 'NO', click: () => {
            dialogRef.close('NO');
          }, isDefault: true
        }])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        alert(`You selected ${result}`);
        this.closeResult = result;
      });
  }

  openDialogDataGrid() {
    const dialogRef = this.modalService
      .modal(ModalDialogDataGridComponent, this.placeholder)
      .buttons(
        [{
          text: 'Cancel', click: () => {
            dialogRef.close('CANCEL');
          }
        },
        {
          text: 'Submit', click: () => {
            dialogRef.close('SUBMIT');
          }, isDefault: true
        }])
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openDialogPicker() {
    const dialogRef = this.modalService
      .modal<ModalDialogPickerComponent>(ModalDialogPickerComponent, this.placeholder)
      .title(this.title)
      .buttons(
        [{
          text: 'Cancel', click: () => {
            dialogRef.close();
          }
        }])
      .open();
  }
}
