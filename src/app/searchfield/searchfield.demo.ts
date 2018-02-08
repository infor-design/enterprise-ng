import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from '@infor/sohoxi-angular';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'soho-searchfield-demo',
  templateUrl: './searchfield.demo.html'
})
export class SohoSearchFieldDemoComponent implements OnInit {
  @ViewChild(SohoSearchFieldComponent) slider: SohoSearchFieldComponent;

  public model = {
    searchValue: ''
  };

  searchfieldOptions = {
    filterMode: 'contains',
    delay: 500,
    source: (query, done) => {
      this.arrayBasedData().subscribe((items) => {
          done(query, items);
      });
    }
  };

  constructor() {}
  ngOnInit() {}

  onChange(event: SohoSliderEvent) {
    console.log('Search Changed' + event.type);
  }

  objectBasedData(): Observable<Array<object>> {
    return Observable.of([
      {value: '1', label: 'Baby'},
      {value: '2', label: 'Shoes'},
      {value: '3', label: 'Mens'},
      {value: '4', label: 'Womens'},
      {value: '5', label: 'Bath'},
      {value: '6', label: 'Home'},
      {value: '7', label: 'Outdoors'}
    ]);
  }

  // This will also work.
  arrayBasedData(): Observable<Array<string>> {
    return Observable.of([
        'Baby', 'Shoes', 'Mens', 'Womens', 'Bath', 'Home', 'Outdoors'
    ]);
  }
}
