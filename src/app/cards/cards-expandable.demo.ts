import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

import { SohoCardComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-cards-expandable-demo',
  templateUrl: 'cards-expandable.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsExpandableDemoComponent implements AfterViewInit {

  @ViewChild(SohoCardComponent, { static: true }) card?: SohoCardComponent;

  ngAfterViewInit(): void {
    console.log("test");
  }
}
