import { Component } from '@angular/core';
// @ts-ignore
import { SohoContextualActionPanelRef } from 'ids-enterprise-ng/lib';

@Component({
    templateUrl: 'contextual-action-panel-searchfield-flex.component.html',
    standalone: false
})

export class ContextualActionPanelSearchfieldFlexComponent {
  panel?: SohoContextualActionPanelRef<unknown>;

  close() {
    this.panel?.close(true, true);
  }
}
