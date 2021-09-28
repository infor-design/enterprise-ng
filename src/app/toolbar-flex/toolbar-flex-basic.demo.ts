import { Component, ViewChild } from '@angular/core';
import { SohoToolbarFlexComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-toolbar-flex-basic-demo',
  templateUrl: 'toolbar-flex-basic.demo.html'
})
export class ToolbarFlexBasicDemoComponent {
  @ViewChild(SohoToolbarFlexComponent) toolbarFlex!: SohoToolbarFlexComponent;

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

  toggleDisabled() {
    const btn = (this.toolbarFlex.buttonsetAPIs as any)[0].buttons[1];
    btn.disabled = !btn.disabled;
  }
}
