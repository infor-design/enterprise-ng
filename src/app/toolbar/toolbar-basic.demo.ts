import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html'
})
export class ToolbarBasicDemoComponent {
  onSelected(event: SohoToolbarSelectedEvent) {
    const data = event.item[0].dataset.action;
    alert(data);
  }
}
