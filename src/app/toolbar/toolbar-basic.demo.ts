import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html'
})
export class ToolbarBasicDemoComponent {
  onSelected(event) {
    let target: EventTarget = event.currentTarget;
    alert(target + ' SELECTED');
  }
}
