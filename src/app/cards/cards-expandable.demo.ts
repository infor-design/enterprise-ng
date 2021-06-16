import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-cards-expandable-demo',
  templateUrl: 'cards-expandable.demo.html',
  styleUrls: ['cards-expandable.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsExpandableDemoComponent implements AfterViewInit {

  ngAfterViewInit(): void { }

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
