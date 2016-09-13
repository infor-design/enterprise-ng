import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html'
})
export class ToolbarBasicDemoComponent {
  onSelected(event) {
    event.data = event.item[0].getAttribute('button-data');
    alert(event.data);
  }
}
