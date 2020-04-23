import {
  Component,
  ViewChild,
  ViewContainerRef
 } from '@angular/core';

import {
  SohoContextualActionPanelService,
  SohoContextualActionPanelRef,
  SohoModalDialogService
} from 'ids-enterprise-ng';

import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { NestedContextualActionPanelComponent } from './nested-contextualaction-panel.component';

/**
 * This is an example of a contextual action panel component, that can be instantiated
 * numerous times using the SohoContextualActionPanelService.
 */
@Component({
  templateUrl: 'contextual-action-panel.component.html'
})

export class ContextualActionPanelComponent {
  @ViewChild('panelPlaceholder', { read: ViewContainerRef, static: true })
  placeholder: ViewContainerRef;
  public model = {
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of next week.',
  };

  public title = 'Contextual Action Panel';
  public panelRef: SohoContextualActionPanelRef<any>;
  public closeResult: string;

  constructor(private panelService: SohoContextualActionPanelService, private modalService: SohoModalDialogService) {
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

    this.panelService
      .contextualactionpanel(NestedContextualActionPanelComponent, this.placeholder)
      .modalSettings({ buttons: buttons, title: 'Nested CAP'})
      .open()
      .initializeContent(true);
  }
}
