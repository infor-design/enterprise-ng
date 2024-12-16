import {
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
// @ts-ignore
import { SohoContextualActionPanelService, SohoContextualActionPanelRef, SohoModalDialogService } from 'ids-enterprise-ng';

import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { NestedContextualActionPanelComponent } from './nested-contextualaction-panel.component';

/**
 * This is an example of a contextual action panel component, that can be instantiated
 * numerous times using the SohoContextualActionPanelService.
 */
@Component({
    templateUrl: 'contextual-action-panel.component.html',
    standalone: false
})

export class ContextualActionPanelComponent {
  @ViewChild('panelPlaceholder', { read: ViewContainerRef, static: true })
  placeholder?: ViewContainerRef;
  public model = {
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of next week.',
  };

  public title = 'Contextual Action Panel';
  public panelRef?: SohoContextualActionPanelRef<any> | null;
  public closeResult?: string;

  constructor(private panelService: SohoContextualActionPanelService, private modalService: SohoModalDialogService) {
  }

  openNested() {
    const dialogRef = this.modalService
      .modal<NestedModalDialogComponent>(NestedModalDialogComponent, (this.placeholder as any))
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

  closeAndOpenSecondCAP() {
    const buttons = [
      {
        text: 'Save',
        cssClass: 'btn',
        icon: '#icon-save',
        click: (_e: any, panel: any) => {
          panel.close(true);
        }
      },
      {
        cssClass: 'separator'
      },
      {
        text: 'Close',
        cssClass: 'btn',
        icon: '#icon-close',
        click: (_e: any, panel: any) => {
          panel.close(true);
        },
        isDefault: true
      }];

    this.panelRef = this.panelService
      // @ts-ignore
      .contextualactionpanel(NestedContextualActionPanelComponent, (this.placeholder as any))
      .modalSettings({ buttons, title: 'Nested CAP using modalSettings' })
      .open()
      .initializeContent(true);
  }

  /**
   * Enable/Disable a button on the CAP panel reference's buttonsetAPI
   */
  toggleSaveDisabled() {
    const btn = (this.panelRef as any).buttonsetAPI?.buttons[0];
    if (btn) {
      btn.disabled = !btn.disabled;
    }
  }

}
