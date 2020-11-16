import {
  of,
  Observable
} from 'rxjs';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SohoSearchFieldComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-searchfield-clear-demo',
  templateUrl: 'searchfield-clear.demo.html'
})
export class SearchFieldClearDemoComponent implements AfterViewInit, OnInit {
  @ViewChild(SohoSearchFieldComponent, { static: true }) searchfield!: SohoSearchFieldComponent;

  public model = {
    searchValue: ''
  };

  public searchfieldOptions = {
    filterMode: 'contains',
    delay: 500,
    source: (query: any, done: any) => {
      this.objectBasedData().subscribe((items) => {
        done(query, items);
      });
    }
  };

  constructor() { }

  ngAfterViewInit() {
    this.searchfield.clear();
  }

  ngOnInit() { }

  onChange(event: SohoSearchFieldEvent) {
    console.log('Search Changed', event.type);
  }

  objectBasedData(): Observable<Array<object>> {
    return of([
      { value: '1', label: 'Atlanta' },
      { value: '2', label: 'Boston' },
      { value: '3', label: 'Brooklyn' },
      { value: '4', label: 'Charlotte' },
      { value: '5', label: 'Chicago' },
      { value: '6', label: 'Cleveland' },
      { value: '7', label: 'Dallas' },
      { value: '8', label: 'Denver' },
      { value: '9', label: 'Detroit' },
      { value: '10', label: 'Golden State' },
    ]);
  }

  arrayBasedData(): Observable<Array<string>> {
    return of([
      'Atlanta',
      'Boston',
      'Brooklyn',
      'Charlotte',
      'Chicago',
      'Cleveland',
      'Dallas',
      'Denver',
      'Detroit',
      'Golden State'
    ]);
  }
}
