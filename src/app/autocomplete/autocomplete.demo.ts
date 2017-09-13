import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { SohoAutoCompleteComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'autocomplete-demo', // tslint:disable-line
  templateUrl: './autocomplete.demo.html',
})
export class AutocompleteDemoComponent implements OnInit {
  public statesUrl = 'http://localhost:4200/app/demodata/states.demo.json?term=';
  @ViewChild(SohoAutoCompleteComponent) autocomplete: SohoAutoCompleteComponent;

  private options: SohoAutoCompleteOptions;

  constructor() {}

  ngOnInit() {}

  public setSource() {
    return this.source.bind(this);
  }

  public source(term: string, response: any) {
    const states = [
      'Alaska',
      'Arizona',
      'California',
      'Colorado',
      'Minnesota',
      'North Dakota',
      'Oregon',
      'Washington',
      'Wyoming'
    ];

    response(term, states);
  }

  public onSelected(event: any) {
    console.log(event);
    console.log(`Selected item: ${event[2].label}`)
  }
}
