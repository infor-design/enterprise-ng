import { Component } from '@angular/core';
import { SohoContextualActionPanelRef } from 'ids-enterprise-ng/lib';

@Component({
  templateUrl: 'contextual-action-panel-fullsize.component.html'
})

export class ContextualActionPanelFullSizeComponent {
  panel: SohoContextualActionPanelRef<unknown>;

  close() {
    this.panel.close();
  }

  openNested() {
    console.log('openNested');
  }
}
