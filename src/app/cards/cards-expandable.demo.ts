import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-cards-expandable-demo',
  templateUrl: 'cards-expandable.demo.html',
  styleUrls: ['cards-expandable.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsExpandableDemoComponent {

  public model = {
    attributes: { name: 'id', value: 'attr-ids-test' }
  };

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
