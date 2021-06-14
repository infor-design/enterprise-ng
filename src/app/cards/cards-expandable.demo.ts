import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cards-expandable-demo',
  templateUrl: 'cards-expandable.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsExpandableDemoComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    console.log("test");
  }
}
