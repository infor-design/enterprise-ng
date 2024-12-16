import { Component } from '@angular/core';
// @ts-ignore
import { SohoContextualActionPanelRef } from 'ids-enterprise-ng/lib';

@Component({
    templateUrl: 'contextual-action-panel-fullsize.component.html',
    standalone: false
})

export class ContextualActionPanelFullSizeComponent {
  panel?: SohoContextualActionPanelRef<unknown>;

  close() {
    this.panel?.close();
  }

  openNested() {
    console.log('openNested');
  }
}
