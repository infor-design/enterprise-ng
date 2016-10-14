import { Component } from '@angular/core';

@Component({
  selector: 'soho-toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html'
})
export class ToolbarBasicDemoComponent {
  onSelected(event: SohoToolbarSelectedEvent) {
    // @todo would it not be better to use a click handler on the button?
    const data = event.item[0].getAttribute('button-data');

    alert(data);
  }
}
