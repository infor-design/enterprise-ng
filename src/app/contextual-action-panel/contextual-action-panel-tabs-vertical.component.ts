import {
  Component,
  HostBinding,
} from '@angular/core';

// @ts-ignore
import { SohoContextualActionPanelRef } from 'ids-enterprise-ng/lib';

@Component({
  templateUrl: 'contextual-action-panel-tabs-vertical.component.html'
})

export class ContextualActionPanelVerticalTabsComponent {
  panel?: SohoContextualActionPanelRef<unknown>;

  constructor() {
  }

  close() {
    this.panel?.close();
  }

  onTabActivated(event: SohoTabsEvent) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
  }
}
