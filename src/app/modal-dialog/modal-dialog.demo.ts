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
  templateUrl: 'modal-dialog.demo.html',
  standalone: false
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

  private modalPickerRef?: SohoModalDialogRef<ModalDialogPickerComponent>;
  private modalFullSizeRef?: SohoModalDialogRef<FullSizeModalDialogComponent>;
  private modalDatepickerRef?: SohoModalDialogRef<ModalDatepickerComponent>;
  private modalNestedRef?: SohoModalDialogRef<NestedModalDialogComponent>;
  private modalVetoableRef?: SohoModalDialogRef<VetoableModalDialogComponent>;
  private modalDatagridRef?: SohoModalDialogRef<ModalDialogDataGridComponent>;

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(private modalService: SohoModalDialogService) {
  }

  openFullSize() {
    if (this.modalFullSizeRef) {
      this.modalFullSizeRef.open();
    } else {
      this.modalFullSizeRef = this.modalService
        .modal<FullSizeModalDialogComponent>(FullSizeModalDialogComponent, this.placeholder, { fullsize: 'responsive' })
        .showCloseBtn(true)
        .title(this.title)
        .icon('check')
        .iconClass('info')
        .buttons(
          [
            {
              text: 'Enable', click: () => {
                const api = this.modalFullSizeRef?.buttonsetAPI;
                if (api) {
                  api.at(2).disabled = false;
                  api.at(3).disabled = false;
                }
              }
            },
            {
              text: 'Disable', click: () => {
                const api = this.modalFullSizeRef?.buttonsetAPI;
                if (api) {
                  api.at(2).disabled = true;
                  api.at(3).disabled = true;
                }
              }
            },
            {
              text: 'Cancel', click: () => {
                this.modalFullSizeRef?.close('CANCEL');
              }
            },
            {
              text: 'Submit', click: () => {
                this.modalFullSizeRef?.close('SUBMIT');
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
  }

  openDialogDatepicker() {
    if (this.modalDatepickerRef) {
      this.modalDatepickerRef.open();
    } else {
      this.modalDatepickerRef = this.modalService
        .modal<ModalDatepickerComponent>(ModalDatepickerComponent, this.placeholder, { fullsize: 'responsive' })
        .showCloseBtn(true)
        .title(this.title)
        .buttons(
          [
            {
              text: 'Enable', click: () => {
                const api = this.modalDatepickerRef?.buttonsetAPI;
                if (api) {
                  api.at(2).disabled = false;
                  api.at(3).disabled = false;
                }
              }
            },
            {
              text: 'Disable', click: () => {
                const api = this.modalDatepickerRef?.buttonsetAPI;
                if (api) {
                  api.at(2).disabled = true;
                  api.at(3).disabled = true;
                }
              }
            },
            {
              text: 'Cancel', click: () => {
                this.modalDatepickerRef?.close('CANCEL');
              }
            },
            {
              text: 'Submit', click: () => {
                this.modalDatepickerRef?.close('SUBMIT');
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
  }

  openNested() {
    if (this.modalNestedRef) {
      this.modalNestedRef.open();
    } else {
      this.modalNestedRef = this.modalService
        .modal<NestedModalDialogComponent>(NestedModalDialogComponent, this.placeholder)
        .buttons(
          [{
            text: 'Cancel', click: () => {
              this.modalNestedRef?.close();
            }
          },
          {
            text: 'Submit', click: () => {
              this.modalNestedRef?.close();
            }, isDefault: true
          }])
        .title(this.title)
        .open()
        .afterClose((result: any) => {
          this.closeResult = result;
        });
    }
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

  openPromise() {
    const beforeClose = (ref: any) => {
      return new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(ref.dialogResult === 'CANCEL');
        }, 1000);
      });
    }

    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
      .buttons(
        [
          {
            text: 'Cancel Slowly', click: () => {
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
      .noPadding(true)
      .open()
      .beforeClose(beforeClose)
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }

  openVetoable() {
    if (this.modalVetoableRef) {
      this.modalVetoableRef.open();
    } else {
      this.modalVetoableRef = this.modalService
        .modal(VetoableModalDialogComponent, this.placeholder)
        .buttons(
          [
            {
              text: 'Cancel', click: () => {
                this.modalVetoableRef?.close('CANCEL');
              }
            },
            {
              text: 'Submit', click: () => {
                this.modalVetoableRef?.close('SUBMIT');
              }, isDefault: true
            }])
        .title(this.title)
        .open()
        .afterClose((result: any) => {
          this.closeResult = result;
        });
    }
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
    if (this.modalDatagridRef) {
      this.modalDatagridRef.open();
    } else {
      this.modalDatagridRef = this.modalService
        .modal(ModalDialogDataGridComponent, this.placeholder)
        .buttons(
          [{
            text: 'Cancel', click: () => {
              this.modalDatagridRef?.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              this.modalDatagridRef?.close('SUBMIT');
            }, isDefault: true
          }])
        .title(this.title)
        .open()
        .afterClose((result: any) => {
          this.closeResult = result;
        });
    }
  }

  openDialogPicker() {
    if (this.modalPickerRef) {
      this.modalPickerRef.open();
    } else {
      this.modalPickerRef = this.modalService
        .modal<ModalDialogPickerComponent>(ModalDialogPickerComponent, this.placeholder)
        .title(this.title)
        .buttons(
          [{
            text: 'Cancel', click: () => {
              this.modalPickerRef?.close();
            }
          }])
        .open();
    }
  }

  openModalButtonsetText() {
    const dialogRef = this.modalService
      .message('<span class="message">Are you sure you want to delete this page?</span>')
      .buttons(
        [
          {
            text: 'Click here to explore our comprehensive collection of innovative solutions for optimizing your workflow and boosting productivity.', click: () => {
              dialogRef.close('CANCEL');
            }
          },
          {
            text: 'Submit', click: () => {
              dialogRef.close('SUBMIT');
            }, isDefault: true
          }
        ])
      .buttonsetTextWidth('auto')
      .title(this.title)
      .open()
      .afterClose((result: any) => {
        this.closeResult = result;
      });
  }
}
