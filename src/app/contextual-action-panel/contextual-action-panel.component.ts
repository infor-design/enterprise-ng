import { Component } from '@angular/core';

/**
 * This is an example of a contextual action panel component, that can be instantiated
 * numerous times using the SohoContextualActionPanelService.
 */
@Component({
  templateUrl: './contextual-action-panel.component.html'
})

export class ContextualActionPanelComponent {

  public model = {
    header: 'Default Header Text',
    comment: 'This task needs to be escalated to maximum priority and delivered by the end of next week.',
  };

  constructor() {
  }
}
