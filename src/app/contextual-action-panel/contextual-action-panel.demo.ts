import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoContextualActionPanelService,
  SohoContextualActionPanelRef,
} from 'ids-enterprise-ng';

import { ContextualActionPanelComponent } from './contextual-action-panel.component';
import { ContextualActionPanelSearchfieldComponent } from './contextual-action-panel-searchfield.component';
import { ContextualActionPanelSearchfieldFlexComponent } from './contextual-action-panel-searchfield-flex.component';
import { NestedContextualActionPanelComponent } from './nested-contextualaction-panel.component';

@Component({
  selector: 'app-contextual-action-panel-demo',
  templateUrl: 'contextual-action-panel.demo.html'
})
export class ContextualActionPanelDemoComponent {
  /**
   * The 'panelPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('panelPlaceholder', { read: ViewContainerRef, static: true })
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
  constructor(private panelService: SohoContextualActionPanelService) {
  }

  openPanel() {
    const buttons = [
      {
        text: 'Save',
        cssClass: 'btn',
        icon: '#icon-save',
        click: (_e: any, panel: any) => {
          this.openPanel2(); // This will reopen
          // panel.close(true); // This will show nothing
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
      .contextualactionpanel(ContextualActionPanelComponent, this.placeholder)
      .modalSettings({ buttons: buttons, title: this.title })
      .open()
      .initializeContent(true)
      .opened(() => {
        console.log('Open Fires');
      })
      .afterOpen(() => {
        console.log('After Open Fires');
      })
      .closed(() => {
        console.log('Closed Fires');
      })
      .afterClose(() => {
        console.log('After Close Fires');
      });
  }

  openPanel2() {
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
      .contextualactionpanel(NestedContextualActionPanelComponent, this.placeholder)
      .modalSettings({ buttons: buttons, title: this.title })
      .open()
      .initializeContent(true);
  }

  openSearchfieldPanel() {
    const panel = this.panelService.contextualactionpanel(ContextualActionPanelSearchfieldComponent, this.placeholder);
    panel
      .apply(component => component.panel = panel)
      .open()
      .initializeContent(true);
  }

  openSearchfieldFlexPanel() {
    const panel = this.panelService.contextualactionpanel(ContextualActionPanelSearchfieldFlexComponent, this.placeholder);
    panel
      .apply(component => component.panel = panel)
      .open()
      .initializeContent(true);
  }

  openResponsive() {
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

    // In openPanel(), change the first CAP opening so that panelRef can be provided with apply
    this.panelRef = this.panelService
          .contextualactionpanel(ContextualActionPanelComponent, this.placeholder)
          .modalSettings({ buttons: buttons, title: this.title })
          .initializeContent(true);

    this.panelRef
          .apply((ref) => {
            ref.panelRef = this.panelRef;
          })
          .open();
  }
}
