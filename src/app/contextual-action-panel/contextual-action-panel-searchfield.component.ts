import { Component } from '@angular/core';
// @ts-ignore
import { SohoContextualActionPanelRef } from 'ids-enterprise-ng/lib';

@Component({
  templateUrl: 'contextual-action-panel-searchfield.component.html'
})

export class ContextualActionPanelSearchfieldComponent {
  panel?: SohoContextualActionPanelRef<unknown>;

  close() {
    this.panel?.close();
  }
}
