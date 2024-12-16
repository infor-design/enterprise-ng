import { Component } from '@angular/core';

@Component({
    selector: 'app-toolbar-preset-more-actions-demo',
    templateUrl: 'toolbar-preset-more-actions.demo.html',
    standalone: false
})

export class ToolbarPresetMoreActionsDemoComponent {
  onSelected(event: SohoToolbarSelectedEvent) {
    const data = (event.item as any)[0].dataset.action;
    alert(data);
  }
}
