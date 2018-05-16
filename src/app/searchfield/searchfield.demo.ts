
import {
  of,
  Observable
} from 'rxjs';

import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-searchfield-demo',
  templateUrl: './searchfield.demo.html'
})
export class SearchFieldDemoComponent implements OnInit {
  @ViewChild(SohoSearchFieldComponent) searchfield: SohoSearchFieldComponent;

  /**
   * Bindable Model value for getting what was typed in the search box.
   */
  public model = {
    searchValue: ''
  };

  /**
   * The set of options we link to in this example.
   */
  searchfieldOptions = {
    filterMode: 'contains',
    delay: 500,
    source: (query, done) => {
      this.objectBasedData().subscribe((items) => {
          done(query, items);
      });
    }
  };

  constructor() {}
  ngOnInit() {}

  /**
   * Change event we link to in this example.
   */
  onChange(event: SohoSearchFieldEvent) {
    console.log('Search Changed' + event.type);
  }

  /**
   * We use an observable with a callback that returns objects in the form: value, label.
   */
  objectBasedData(): Observable<Array<object>> {
    return of([
      {value: '1', label: 'Baby'},
      {value: '2', label: 'Shoes'},
      {value: '3', label: 'Mens'},
      {value: '4', label: 'Womens'},
      {value: '5', label: 'Bath'},
      {value: '6', label: 'Home'},
      {value: '7', label: 'Outdoors'}
    ]);
  }

  /**
   * A straight array will also work (change line 31)
   */
  arrayBasedData(): Observable<Array<string>> {
    return of([
        'Baby', 'Shoes', 'Mens', 'Womens', 'Bath', 'Home', 'Outdoors'
    ]);
  }
}
