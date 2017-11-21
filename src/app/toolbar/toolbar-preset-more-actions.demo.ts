import { Component } from '@angular/core';

@Component({
  selector: 'soho-toolbar-preset-more-actions-demo',
  templateUrl: './toolbar-preset-more-actions.demo.html'
})

export class ToolbarPresetMoreActionsDemoComponent {
  onSelected(event: SohoToolbarSelectedEvent) {
    const data = event.item[0].dataset.action;
    alert(data);
  }
}
