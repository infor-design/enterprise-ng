import { Component } from '@angular/core';

/**
 * This is an example of a contextual action panel component, that can be instantiated
 * numerous times using the SohoContextualActionPanelService.
 */
@Component({
  templateUrl: './contextual-action-panel.component.html'
})

export class ContextualActionPanelComponent {
  headerText: string = 'Default Header Text';
  constructor() { }
}
