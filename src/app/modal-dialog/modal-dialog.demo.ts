import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalDialogService,
  SohoModalDialogRef
} from '../../soho/modal-dialog';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';

@Component({
  selector: 'soho-modal-dialog.demo',
  templateUrl: 'modal-dialog.demo.html'
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

  /**
   * The interface to an instantiated instance of the ExampeDialogComponent.
   */
  private dialog: SohoModalDialogRef<ExampleModalDialogComponent>;

  private closeResult: string;

  private title = 'Example Modal Dialog';
  private isAlert = true;

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(private modalService: SohoModalDialogService) {
  }

  open() {

    console.log(this.isAlert);

    const buttons = [{
      text: 'Cancel',
      click: (e, modal) => {
        modal.close(true);
      }
    },
    {
      text: 'Submit',
      click: (e, modal) => {
        modal.close(true);
      },
      isDefault: true
    }];

    this.dialog = this.modalService
      /** Create a modal based on a component. */
      .modal(ExampleModalDialogComponent, this.placeholder)
      .buttons(buttons)
      .title(this.title)
      .isAlert(this.isAlert)
      .open();

    /** @todo Create a modal based on HTML. */

    /** @todo Result - OK, Cancel, Json? */

    // Attach a listener to the afterclose event, which also gives you the result - if available.
    this.dialog.afterClosed().subscribe(result => {
      this.closeResult = result;
      this.dialog = null;
    });
  }

}
