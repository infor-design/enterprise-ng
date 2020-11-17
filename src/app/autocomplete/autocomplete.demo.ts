import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoAutoCompleteComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'autocomplete-demo',
  templateUrl: 'autocomplete.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteDemoComponent implements AfterViewInit {
  public url = './app/demodata/cities.demo.json?term=';
  public statesUrl = './app/demodata/states.demo.json?term=';
  public states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];
  public xssSource: SohoAutoCompleteSource = [
    'Hello',
    'World',
    '<script>alert(1)</script>xss'
  ];
  @ViewChild(SohoAutoCompleteComponent) autocomplete?: SohoAutoCompleteComponent;

  public selected: any;
  options?: SohoAutoCompleteOptions;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.reinitialise();
    });
  }

  reinitialise() {
    setTimeout(() => {
      this.url = this.statesUrl;
      this.changeDetectorRef.detectChanges();
      this.autocomplete?.updated();
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
