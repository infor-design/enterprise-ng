import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-cards-multi-select-demo',
  templateUrl: 'cards-multi-select.demo.html'
})
export class CardsMultiSelectDemoComponent {

  public data: Object[] = [
    {
      "id": 1,
      "time": "5:30AM-8:00AM",
      "job": "Cashier II",
      "location": "NE Campus",
      "team": "NE_FLR",
      "department": "DEPT A"
    },
    {
      "id": 2,
      "time": "9:00AM-12:00PM",
      "job": "Cashier II",
      "location": "NE Campus",
      "team": "NE_FLR",
      "department": "DEPT A"
    },
    {
      "id": 3,
      "time": "1:00PM-5:00PM",
      "job": "Cashier II",
      "location": "NE Campus",
      "team": "NE_FLR",
      "department": "DEPT A"
    }
  ];

}
