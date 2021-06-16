import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-cards-demo',
  templateUrl: 'cards.demo.html',
})
export class CardsDemoComponent {

  onBeforeOpen(_event: any) {
  }
  onClose(_event: any) {
  }
  onOpen(_event: any) {
  }
  onSelected(event: any) {
    console.log('Selected item: ' + event);
  }
}
