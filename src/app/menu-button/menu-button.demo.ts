import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'soho-menu-button-demo',
  templateUrl:'./menu-button.demo.html',
})
export class MenuButtonDemoComponent {

  disabledEntryClicked() {
    alert('Should not be Allowed');
  }

  @HostListener('selected', ['$event'])
  onSelected() {
    console.log('onSelected');
  }

  onBeforeopen() {
    console.log('onBeforeopen');
  }

  onClose() {
    console.log('onClose');
  }

  onOpen() {
    console.log('onOpen');
  }
}
