import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-flex-basic-demo',
  templateUrl: 'toolbar-flex-basic.demo.html'
})
export class ToolbarFlexBasicDemoComponent {
  onSelected(event: SohoToolbarFlexSelectedEvent) {
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      console.log(event.item.selectedAnchor[0].getAttribute('id'));
    } else {
      console.log(event.item);
    }
  }

  public moreButtonId = 'my-more-button';

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
