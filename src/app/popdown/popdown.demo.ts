import { Component, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';

import {
  SohoPopDownDirective,
  SohoListViewComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-popdown-demo',
  templateUrl: './popdown.demo.html',
})
export class PopDownDemoComponent {
  @ViewChild('statesPopDown', { read: SohoPopDownDirective })
  public statesPopDown: SohoPopDownDirective;
  @ViewChild(SohoListViewComponent) public stateViewList: SohoListViewComponent;

  public showSelectedOnly = false;

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

  public selectedStates = [];

  public get visibleStates() {
    return this.showSelectedOnly ? this.selectedStates : this.states;
  }

  constructor(protected changeDetector: ChangeDetectorRef) {

  }

  public onSelected(event) {
    this.selectedStates = [];
    if (event.length > 1 && event[1].selectedItems !== undefined) {
      event[1].selectedItems.forEach((item) => {
        const data = $(item).attr('data');
        console.log(data);
        this.selectedStates.push(data);
      });
      this.changeDetector.detectChanges();
    }
  }

  public onClickOK(event: any) {
    this.statesPopDown.close();
  }

  public onClickCancel(event: any) {
    this.statesPopDown.close();
  }
}
