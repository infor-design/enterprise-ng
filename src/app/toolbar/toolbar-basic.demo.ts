import { Component } from '@angular/core';

@Component({
    selector: 'app-toolbar-basic-demo',
    templateUrl: 'toolbar-basic.demo.html',
    standalone: false
})
export class ToolbarBasicDemoComponent {
  onSelected(event: SohoToolbarSelectedEvent) {
    const data = ((event.item as any)[0] as any).dataset.action;
    alert(data);
  }
}
