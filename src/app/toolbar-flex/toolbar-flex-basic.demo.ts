import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-flex-basic-demo',
  templateUrl: 'toolbar-flex-basic.demo.html'
})
export class ToolbarFlexBasicDemoComponent {
  onSelected(event: any) {
    let data = '';
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      data = event.item.selectedAnchor[0].dataset.action;
    } else {
      data = event.item.element.dataset.action;
    }
    alert(data);
  }

  public onSubmit() {
    console.log('submit');
  }

  public onChange(event: any) {
    console.log('Change Fired', event);
  }

  public onCleared(event: any) {
    console.log('Clear Fired', event);
  }

}
