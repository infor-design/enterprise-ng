import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import { SohoAutoCompleteComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'autocomplete-demo', // tslint:disable-line
  templateUrl: './autocomplete.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteDemoComponent implements AfterViewInit {
  public url       = 'http://localhost:4200/app/demodata/cities.demo.json?term=';
  public statesUrl = 'http://localhost:4200/app/demodata/states.demo.json?term=';
  public states = [
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

  @ViewChild(SohoAutoCompleteComponent) autocomplete: SohoAutoCompleteComponent;

  private options: SohoAutoCompleteOptions;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.reinitialise();
    });
  }

  reinitialise() {
    setTimeout(() => {
      this.url = this.statesUrl;
      this.changeDetectorRef.detectChanges();
      this.autocomplete.updated();
    }, 5000);
  }

  public source = (term: string, response: any) => {
    response(term, this.states);
  }

  public onSelected(event: any) {
    console.log(event);
    console.log(`Selected item: ${event[2].label}`);
  }
}
