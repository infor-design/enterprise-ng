import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoContextualActionPanelService,
  SohoContextualActionPanelRef,
  SohoModalDialogService,
  SohoModalDialogRef
} from 'ids-enterprise-ng';

import { ContextualActionPanelComponent } from './contextual-action-panel.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';

@Component({
  selector: 'soho-contextual-action-panel.demo',
  templateUrl: './contextual-action-panel.demo.html'
})
export class ContextualActionPanelDemoComponent {
  /**
   * The 'panelPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('panelPlaceholder', { read: ViewContainerRef })
  placeholder: ViewContainerRef;

  /**
   * The interface to an instantiated instance of the Contextual Action Panel.
   */
  public panelRef: SohoContextualActionPanelRef<any>;
  public closeResult: string;
  public title = 'Contextual Action Panel';

  /**
   * Constructor.
   *
   * @param panelService - the modal dialog service.
   */
  constructor(private panelService: SohoContextualActionPanelService, private modalService: SohoModalDialogService) {
  }

  openPanel() {
    const buttons = [
      {
        text: 'Save',
        cssClass: 'btn',
        icon: '#icon-save',
        click: (e, panel) => {
          panel.close(true);
        }
      },
      {
        cssClass: 'separator' },
      {
        text: 'Close',
        cssClass: 'btn',
        icon: '#icon-close',
        click: (e, panel) => { panel.close(true); },
        isDefault: true
      }];

    this.panelRef = this.panelService
      .contextualactionpanel(ContextualActionPanelComponent, this.placeholder)
      .buttons(buttons)
      .title(this.title)
      .initializeContent(true)
      .open();
  }
}
